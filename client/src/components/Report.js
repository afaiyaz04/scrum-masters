import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Returns the equivalent pageBody
export const formatUserReport = (reportInfo) => {
    if (!reportInfo) return [];
    const {
        name,
        orderStatus,
        totalClients,
        totalOrders,
        totalRevenue,
        orders,
    } = reportInfo;

    const summary = [
        { text: `${name} - Report`, fontSize: 24 },
        { text: "\nOrder Summary\n\n", fontSize: 16 },
        {
            ul: [
                ...Object.entries(orderStatus).map(([k, v]) => {
                    return `${v} - ${k}`;
                }),
            ],
        },
        { text: "\nClients and Revenue\n\n", fontSize: 16 },
        `Total Orders = ${totalOrders}`,
        `Number of clients = ${totalClients}`,
        `Total revenue = ${totalRevenue}`,
    ];

    const productDetails = (order) => [
        order.lineProducts.map((product) => {
            return [
                { text: `\nItem Name: ${product.name}` },
                { text: `Item Price: ${product.price}` },
                { text: `Quantity: ${product.quantity}` },
            ];
        }),
    ];

    const orderDetails = [
        { text: "\nOrders", fontSize: 16 },
        orders.map((order) => {
            return {
                columns: [
                    [
                        {
                            text: `\nOrder: ${order.orderNumber}`,
                            style: { bold: true },
                        },
                        { text: `Client: ${order.client}` },
                        { text: `Status: ${order.status}` },
                        { text: `Last Modified: ${order.lastModified}` },
                        { text: `Time Placed: ${order.timePlaced}` },
                        { text: `Fee: ${order.totalFee}` },
                    ],
                    [{ text: "\nOrder Items" }, ...productDetails(order)],
                ],
            };
        }),
    ];

    return [...summary, orderDetails, { text: "", pageBreak: "after" }];
};

// Create the actual document for report
export const createReport = (pageBody, fileName) => {
    // Get time of generation
    const date = new Date();
    const zeroPad = (num) => String(num).padStart(2, "0");
    // Format
    const header = {
        text: `Time Generated: ${zeroPad(date.getDate())}/${zeroPad(
            date.getMonth() + 1
        )}/${date.getFullYear()} @ ${zeroPad(date.getHours())}:${zeroPad(
            date.getMinutes()
        )}:${zeroPad(date.getSeconds())}`,
        alignment: "right",
    };

    console.log(pageBody);

    // Make into doc
    const doc = {
        header,
        content: pageBody,
    };
    pdfMake.createPdf(doc).download(fileName);
};
