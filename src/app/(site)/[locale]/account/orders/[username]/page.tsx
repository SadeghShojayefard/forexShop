import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getOrdersForOneUser } from "@/helper/orderAction";
import { getTranslations } from "@/i18n/getTranslations";

export default async function AccountOrdersPage({ params }: { params:  Promise<  { locale: string, username: string }> }) {

    const { locale, username } = await params;
    const t = await getTranslations(locale);
    const Orders = await getOrdersForOneUser(username);

    return (
        <div className="w-full  flex flex-row justify-center items-center gap-2  text-start  pb-5 shadow-2xl shadow-black rounded-2xl px-2 ">
            <Table className="w-full shadow-2xl shadow-black ">
                <TableHeader className=" shadow-lg shadow-black">
                    <TableRow  >
                        <TableHead className={`${locale === "fa" ? "text-right" : "text-left"} text-xl font-bold`} >{t("lineNumber")}</TableHead>
                        <TableHead className={`${locale === "fa" ? "text-right" : "text-left"} text-xl font-bold`} >{t("name")}</TableHead>
                        <TableHead className={`${locale === "fa" ? "text-right" : "text-left"} text-xl font-bold`} >{t("count")}</TableHead>
                        <TableHead className={`${locale === "fa" ? "text-right" : "text-right"} text-xl font-bold`}  >{t("totalPrice")}</TableHead>
                        <TableHead className={`${locale === "fa" ? "text-right" : "text-right"} text-xl font-bold`}  >{t("date")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {Orders.payload.data.length !== 0 ?

                        (
                            Orders.payload.data.map((item, index) => (
                                <TableRow key={item.id} className=" shadow-lg shadow-black hover:bg-cyan-900  hover:text-white ">
                                    <TableCell className="font-medium ">{index + 1}</TableCell>
                                    <TableCell>{item.productName}</TableCell>
                                    <TableCell>{item.count}</TableCell>
                                    <TableCell className="text-right">{Number(item.totalPrice).toLocaleString()}</TableCell>
                                    <TableCell className="text-right">{item.createdAt.toLocaleString(locale)}</TableCell>
                                </TableRow>
                            ))
                        )
                        :
                        (
                            <TableRow  >
                                <TableCell colSpan={5} className="text-center">
                                    شما هنوز خریدی انجام نداده اید.
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>

            </Table>
        </div>

    );
}
