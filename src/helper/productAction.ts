'use server';
import dbConnect from "@/lib/db";
import Products from "@/lib/models/products";
import { productCreateSchema } from "@/validation/productCreateValidation";
import { productUpdateSchema } from "@/validation/productUpdateValidation";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";
import path from 'path';
import fs from 'fs/promises';
import { productChangePublishStatueSchema } from "@/validation/productChangePublishStatueValidation";
import { cleanFile, cleanFileArray, deleteFileFromServer, uploadFileOnServer } from "./sharedFunction";

const productImage = path.join(process.cwd(), 'public', 'Products');
fs.mkdir(productImage, { recursive: true }); // اطمینان از وجود پوشه

const IndicatorFile = path.join(process.cwd(), 'public', 'IndicatorFile');
fs.mkdir(IndicatorFile, { recursive: true }); // اطمینان از وجود پوشه

export async function productCreateAction(prevState: unknown, formData: FormData) {

    const subMission = parseWithZod(formData, {
        schema: productCreateSchema(),
    });

    if (subMission.status !== "success") {
        return subMission.reply();
    }

    try {
        await dbConnect();
        // ذخیره داده‌ها در دیتابیس
        const {
            name,
            shortName,
            mainImage,
            slideImage,
            metaTags,
            score,
            userNumber,
            initPriceToman,
            initPriceTether,
            discount,
            finalPriceToman,
            finalPriceTether,
            indicatorFile,
            textFA,
            textEn,
            publishState,

        } = subMission.value;

        const shortNameresult = await checkShortNameAction(shortName);
        if (shortNameresult.status === "error") {
            return subMission.reply({
                fieldErrors: {
                    shortName: ["نام کوتاه انتخاب شده تکراری است."],
                },
            });
        }

        let mainImagePath = await uploadFileOnServer(mainImage, "Products");

        const slideImagePaths: string[] = [];

        if (Array.isArray(slideImage)) {
            for (const file of slideImage) {
                slideImagePaths.push(await uploadFileOnServer(file, "Products"));
            }
        }
        let indicatorFilePath = await uploadFileOnServer(indicatorFile, "IndicatorFile");



        await Products.create({
            name,
            shortName,
            mainImage: mainImagePath,
            slideImage: slideImagePaths,
            metaTags,
            score: Number(score),
            userNumber: Number(userNumber),
            initPriceToman: Number(initPriceToman),
            initPriceTether: Number(initPriceTether),
            discount: Number(discount),
            finalPriceToman: Number(finalPriceToman),
            finalPriceTether: Number(finalPriceTether),
            indicatorFile: indicatorFilePath,
            textFA,
            textEn,
            publishState: publishState === "0" ? false : true,
        });



        // Revalidate مسیر صفحه برای به‌روزرسانی جدول
        revalidatePath('/cmsProduct');
        return {
            status: 'success',
            payload: {
                message: '',
            },
        } as const;
    } catch (error) {
        console.error('Error saving contact form:', error);
        return {
            status: 'error',
            payload: {
                message: '',
            },
        } as const;
    }
}


export async function productUpdateAction(prevState: unknown, formData: FormData) {


    // گرفتن فایل‌ها از formData
    const rawMainImage = formData.get('mainImage') as File | null;
    const rawSlideImages = formData.getAll('slideImage') as File[];
    const rawIndicatorFile = formData.get('indicatorFile') as File | null;

    // پاک‌سازی فایل‌ها
    const cleanedMainImage = cleanFile(rawMainImage);
    const cleanedSlideImages = cleanFileArray(rawSlideImages);
    const cleanedIndicatorFile = cleanFile(rawIndicatorFile);

    // تنظیم مجدد در formData
    formData.set('mainImage', cleanedMainImage ?? '');
    formData.set('indicatorFile', cleanedIndicatorFile ?? '');

    // برای آرایه‌ها، چون set فقط یکی رو ست می‌کنه، اول delete و بعد add می‌کنیم
    formData.delete('slideImage');
    (cleanedSlideImages.length ? cleanedSlideImages : ['']).forEach(file =>
        formData.append('slideImage', file)
    );

    // لاگ گرفتن از فایل‌ها بعد از پاک‌سازی


    // اعتبارسنجی با Zod
    const subMission = parseWithZod(formData, {
        schema: productUpdateSchema(),
    });

    if (subMission.status !== "success") {
        return subMission.reply();
    }

    await dbConnect();


    try {
        const existingProduct = await Products.findById(subMission.value.id);
        if (!existingProduct) {
            return {
                status: 'error',
                payload: {
                    message: 'محصول پیدا نشد',
                },
            } as const;
        }


        let newMainImagePath = null;
        let sendedDataforMainImage = subMission.value.mainImage;
        if (sendedDataforMainImage === null || sendedDataforMainImage === undefined ||
            !(sendedDataforMainImage instanceof File) || sendedDataforMainImage.size === 0 || sendedDataforMainImage.name === 'undefined') {
            newMainImagePath = existingProduct.mainImage;
        }
        else {
            await deleteFileFromServer(existingProduct.mainImage);
            newMainImagePath = await uploadFileOnServer(sendedDataforMainImage, "Products");
        }

        let newIndicatorFilePath = null;
        let sendedDataforIndicatorFile = subMission.value.indicatorFile;
        if (sendedDataforIndicatorFile === null || sendedDataforIndicatorFile === undefined ||
            !(sendedDataforIndicatorFile instanceof File) || sendedDataforIndicatorFile.size === 0 || sendedDataforIndicatorFile.name === 'undefined') {
            newIndicatorFilePath = existingProduct.indicatorFile;
        }
        else {
            await deleteFileFromServer(existingProduct.indicatorFile);
            newIndicatorFilePath = await uploadFileOnServer(sendedDataforIndicatorFile, "IndicatorFile");
        }
        let newSlideImagePaths: string[] = [];
        let sendedDataforSildeImage = subMission.value.slideImage;

        if (sendedDataforSildeImage === null ||
            sendedDataforSildeImage === undefined ||
            !Array.isArray(sendedDataforSildeImage) ||
            sendedDataforSildeImage.length === 0 ||
            (sendedDataforSildeImage.length === 1 &&
                sendedDataforSildeImage[0].size === 0 &&
                sendedDataforSildeImage[0].name === 'undefined')) {
            newSlideImagePaths = [...existingProduct.slideImage];
        }
        else {
            // حذف تصاویر قبلی
            for (const file of existingProduct.slideImage) {
                await deleteFileFromServer(file);
            }

            // آپلود تصاویر جدید
            for (const file of sendedDataforSildeImage) {
                if (file instanceof File && file.size > 0) {
                    const uploadedPath = await uploadFileOnServer(file, "Products");
                    newSlideImagePaths.push(uploadedPath);
                }
            }
        }


        const updatedProduct = await Products.findByIdAndUpdate(
            subMission.value.id,
            {
                $set: {
                    name: subMission.value.name,
                    shortName: subMission.value.shortName,
                    mainImage: newMainImagePath,
                    slideImage: newSlideImagePaths,
                    metaTags: subMission.value.metaTags,
                    score: Number(subMission.value.score),
                    userNumber: Number(subMission.value.userNumber),
                    initPriceToman: Number(subMission.value.initPriceToman),
                    initPriceTether: Number(subMission.value.initPriceTether),
                    discount: Number(subMission.value.discount),
                    finalPriceToman: Number((subMission.value.initPriceToman * (1 - subMission.value.discount / 100))),
                    finalPriceTether: Number((subMission.value.initPriceTether * (1 - subMission.value.discount / 100))),
                    indicatorFile: newIndicatorFilePath,
                    textFA: subMission.value.textFA,
                    textEn: subMission.value.textEn,
                    publishState: subMission.value.publishState === "0" ? false : true
                }
            },
            { new: true } // برگرداندن داکیومنت آپدیت‌شده
        ).exec();

        revalidatePath('/cmsProduct');

        return {
            status: 'success',
            payload: {
                message: subMission.value.shortName,
            },
        } as const;
    } catch (error) {
        return {
            status: 'error',
            payload: {
                message: '',
            },
        } as const;
    }
}



export async function checkShortNameAction(shortName: string) {
    await dbConnect();

    try {
        const existingProduct = await Products.findOne({ shortName: shortName.trim() });
        if (existingProduct) {
            return {
                status: 'error',
            };
        }
        return {
            status: 'success',
        };
    } catch (error) {
        return {
            status: 'error',
        };
    }
}

export async function checkNameAction(name: string) {
    await dbConnect();

    try {
        const existingProduct = await Products.findOne({ name: name.trim() });
        if (existingProduct) {
            return {
                status: 'success',
            };
        }
        return {
            status: 'error',
        };
    } catch (error) {
        return {
            status: 'error',
        };
    }
}

export async function checkMainNameAction(name: string) {
    await dbConnect();

    try {
        const existingProduct = await Products.findOne({ name: name.trim() });
        if (existingProduct) {
            return {
                status: 'error',
                data: {
                    id: existingProduct.id,
                    finalPrice: existingProduct.finalPriceToman
                }
            };
        }
        return {
            status: 'success',
            data: {
                id: existingProduct.id,
                finalPrice: existingProduct.finalPriceToman
            }
        };
    } catch (error) {
        return {
            status: 'error',

        };
    }
}


export async function getAllProducts(page: number = 1, limit: number = 20) {
    await dbConnect();

    try {
        // محاسبه تعداد آیتم‌هایی که باید رد بشن
        const skip = (page - 1) * limit;

        // گرفتن داده‌ها با مرتب‌سازی و صفحه‌بندی
        const ProductsData = await Products.find({}, `_id name mainImage score finalPriceToman finalPriceTether publishState shortName`)
            .sort({ _id: -1 }) // مرتب‌سازی نزولی بر اساس createdAt
            .skip(skip) // رد کردن آیتم‌های صفحات قبلی
            .limit(limit) // محدود کردن به 20 آیتم
            .lean()
            .exec();

        // گرفتن تعداد کل آیتم‌ها برای محاسبه تعداد صفحات
        const total = await Products.countDocuments();

        return {
            status: 'success',
            payload: {
                data: ProductsData.map((data: any) => ({
                    id: data._id.toString(), // تبدیل _id به string
                    name: data.name,
                    mainImage: data.mainImage,
                    score: data.score,
                    finalPriceToman: data.finalPriceToman,
                    finalPriceTether: data.finalPriceTether,
                    publishState: data.publishState,
                    shortName: data.shortName
                })),
                pagination: {
                    page, // صفحه فعلی
                    limit, // تعداد آیتم‌ها در هر صفحه
                    total, // تعداد کل آیتم‌ها
                    totalPages: Math.ceil(total / limit), // تعداد کل صفحات
                },
            },
        } as const;
    } catch (error) {
        console.error('', error);
        return {
            status: 'error',
            payload: {
                data: [],
                pagination: {
                    page: 1,
                    limit: 20,
                    total: 0,
                    totalPages: 0,
                },
            },
        } as const;
    }
}

export async function getAllProductsForSite(pageName: string) {
    const db = await dbConnect();
    console.log("DB Name:", db.connection.name); // اسم دیتابیس متصل‌شده

    try {
        let limit = 0;
        if (pageName === "home") {
            limit = 4;
        }
        else {
            limit = 11;
        }
        // گرفتن داده‌ها با مرتب‌سازی و صفحه‌بندی
        const ProductsData = await Products.find(
            { publishState: true }, // فقط محصولاتی که منتشر شده‌اند
            `_id name mainImage score finalPriceToman finalPriceTether userNumber shortName discount`
        )
            .sort({ _id: -1 }) // مرتب‌سازی نزولی
            .skip(0) // از اولین آیتم شروع
            .limit(limit) // محدودیت تعداد
            .lean()
            .exec();
        // گرفتن تعداد کل آیتم‌ها برای محاسبه تعداد صفحات
        const total = await Products.countDocuments();

        return {
            status: 'success',
            payload: {
                data: ProductsData.map((data: any) => ({
                    id: data._id.toString(), // تبدیل _id به string
                    name: data.name,
                    mainImage: data.mainImage,
                    score: data.score,
                    userCount: data.userNumber,
                    finalPriceToman: data.finalPriceToman,
                    finalPriceTether: data.finalPriceTether,
                    shortName: data.shortName,
                    discount: data.discount
                })),
            },
        } as const;
    } catch (error) {
        console.error('', error);
        return {
            status: 'error',
            payload: {
                data: [],
            },
        } as const;
    }
}



export async function getOneProduct(shortName: string) {
    await dbConnect();

    try {
        const existingProduct = await Products.findOne({ shortName: shortName.trim() });
        if (existingProduct) {
            return {
                status: 'success',
                payload: {
                    data: {
                        id: existingProduct._id.toString(),
                        name: existingProduct.name,
                        shortName: existingProduct.shortName,
                        mainImage: existingProduct.mainImage,
                        slideImage: existingProduct.slideImage,
                        metaTags: existingProduct.metaTags,
                        score: existingProduct.score,
                        userCount: existingProduct.userNumber,
                        initPriceToman: existingProduct.initPriceToman,
                        initPriceTether: existingProduct.initPriceTether,
                        discount: existingProduct.discount,
                        finalPriceToman: existingProduct.finalPriceToman,
                        finalPriceTether: existingProduct.finalPriceTether,
                        indicatorFile: existingProduct.indicatorFile,
                        textFA: existingProduct.textFA,
                        textEn: existingProduct.textEn,
                        publishState: existingProduct.publishState
                    },
                },
            } as const;
        }
        else {
            return {
                status: 'error',
                payload: {
                    data: null
                },
            } as const;
        }

    } catch (error) {
        return {
            status: 'error',
        };
    }
}

export async function PublishChange(prevState: unknown, formData: FormData) {
    // ولیدیشن داده‌ها
    const subMission = parseWithZod(formData, {
        schema: productChangePublishStatueSchema(),
    });

    if (subMission.status !== 'success') {
        return subMission.reply();
    }

    const { id } = subMission.value;

    // اتصال به دیتابیس

    try {
        await dbConnect();
        // پیدا کردن محصول برای گرفتن publishState فعلی
        const product = await Products.findById(id).exec();

        if (!product) {
            return {
                status: 'error',
                payload: {
                    message: 'محصول با این آیدی یافت نشد',
                },
            } as const;
        }

        // توگل publishState
        const updatedProduct = await Products.findByIdAndUpdate(
            id,
            { $set: { publishState: !product.publishState } },
            { new: true } // برگرداندن داکیومنت آپدیت‌شده
        ).exec();

        if (!updatedProduct) {
            return {
                status: 'error',
                payload: {
                    message: 'خطا در به‌روزرسانی محصول',
                },
            } as const;
        }

        // Revalidate مسیر صفحه برای به‌روزرسانی جدول
        revalidatePath('/cmsProduct');

        return {
            status: 'success',
            payload: {
                message: `وضعیت انتشار به ${updatedProduct.publishState ? 'منتشرشده' : 'پیش‌نویس'} تغییر کرد`,
            },
        } as const;
    } catch (error) {
        console.error('خطا در تغییر وضعیت انتشار:', error);
        return {
            status: 'error',
            payload: {
                message: 'خطایی در تغییر وضعیت انتشار رخ داد',
            },
        } as const;
    }
}

export async function getProductMetaTag(shortName: string) {
    await dbConnect();

    try {
        const existingProduct = await Products.findOne({ shortName: shortName.trim() });
        if (existingProduct) {
            return {
                status: 'success',
                payload: {
                    data: {
                        metaTags: existingProduct.metaTags,
                        title: existingProduct.name,
                    },
                },
            } as const;
        }

    } catch (error) {
        return {
            status: 'error',
        };
    }
}






