'use server';
import { offFormShema } from "@/validation/offFormValidation";
import { parseWithZod } from "@conform-to/zod";
import Products from "@/lib/models/products";

export async function offFormAction(prevState: unknown, formData: FormData) {
    const subMission = parseWithZod(formData, {
        schema: offFormShema(),
    });

    if (subMission.status !== "success") {
        return subMission.reply();
    }

    try {
        const allProducts = await Products.find({});
        const discount = Number(subMission.value.offs);

        const bulkOps = allProducts.map((product) => {
            const finalPriceToman = product.initPriceToman * (1 - discount / 100);
            const finalPriceTether = product.initPriceTether * (1 - discount / 100);

            return {
                updateOne: {
                    filter: { _id: product._id },
                    update: {
                        $set: {
                            discount,
                            finalPriceToman,
                            finalPriceTether
                        }
                    }
                }
            };
        });

        // ✅ این خط رو اضافه کن:
        await Products.bulkWrite(bulkOps);

        return {
            status: 'success',
            payload: {
                message: `تخفیف ${discount}% با موفقیت اعمال شد`,
            },
        } as const;

    } catch (error) {
        console.error('خطا در تغییر تخفیف همگانی:', error);
        return {
            status: 'error',
            payload: {
                message: 'خطایی در تغییر تخفیف رخ داد',
            },
        } as const;
    }
}
