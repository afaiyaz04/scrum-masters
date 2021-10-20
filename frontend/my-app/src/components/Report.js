// import {
//     Document,
//     Packer,
//     Paragraph,
//     TextRun,
//     Header,
//     AlignmentType,
//     PageBreak,
// } from "docx";
// import { saveAs } from "file-saver";
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

    // // Format attrivutes
    // const nameFormat = new TextRun({
    //     text: `${name} - Report`,
    //     bold: true,
    //     font: "Calibri",
    //     size: 40,
    // });
    // const orderStatusFormat = Object.entries(orderStatus).map(([k, v]) => {
    //     return new Paragraph({
    //         bullet: { level: 0 },
    //         children: [
    //             new TextRun({
    //                 text: `${v} - ${k.toLowerCase()}`,
    //                 font: "Calibri",
    //             }),
    //         ],
    //     });
    // });
    // const totalOrdersFormat = new TextRun({
    //     text: `Total Orders = ${totalOrders}`,
    //     font: "Calibri",
    // });

    // const totalClientsFormat = new TextRun({
    //     text: `Number of clients = ${totalClients}`,
    //     font: "Calibri",
    // });

    // const totalRevenueFormat = new TextRun({
    //     text: `Total revenue = $${totalRevenue}`,
    //     font: "Calibri",
    //     underline: true,
    // });

    // // Combine for page body
    // const pageBody = [
    //     // Title
    //     new Paragraph({
    //         children: [nameFormat],
    //     }),

    //     // Orders
    //     new Paragraph({
    //         children: [
    //             new TextRun({
    //                 text: "Orders",
    //                 font: "Calibri",
    //                 size: 24,
    //                 bold: true,
    //             }),
    //         ],
    //         spacing: { before: 200 },
    //     }),
    //     ...orderStatusFormat,
    //     new Paragraph({
    //         children: [totalOrdersFormat],
    //     }),

    //     // Clients and Revenue
    //     new Paragraph({
    //         children: [
    //             new TextRun({
    //                 text: "Clients and Revenue",
    //                 font: "Calibri",
    //                 size: 24,
    //                 bold: true,
    //             }),
    //         ],
    //         spacing: { before: 200 },
    //     }),
    //     new Paragraph({
    //         children: [totalClientsFormat],
    //     }),
    //     new Paragraph({
    //         children: [totalRevenueFormat, new PageBreak()],
    //     }),
    // ];

    return [
        { text: `${name} - Report`, fontSize: 24, pageBreak: "before" },
        { text: "\nOrder Summary", fontSize: 16 },
        ...Object.entries(orderStatus).map(([k, v]) => {
            return `${v} - ${k.toLowerCase()}`;
        }),
        { text: "\nClients and Revenue", fontSize: 16 },
        `Total Orders = ${totalOrders}`,
        `Number of clients = ${totalClients}`,
        `Total revenue = $${totalRevenue}`,
        { text: "\nOrders", fontSize: 16 },
        orders.map((order) => {
            return [
                { text: `\nOrder: ${order.orderNumber}` },
                { text: `Client: ${order.client}` },
                { text: `Status: ${order.status}` },
                { text: `Last Modified: ${order.lastModified}` },
                { text: `Time Placed: ${order.timePlaced}` },
                { text: `Fee: ${order.totalFee}` },
                { text: "\nProducts" },
                order.lineProducts.map((product) => {
                    return [
                        { text: `\nItem Name: ${product.name}` },
                        { text: `Item Price: ${product.price}` },
                        { text: `Quantity: ${product.quantity}` },
                    ];
                }),
            ];
        }),
    ];
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
    };

    console.log(pageBody);

    // Make into doc
    const doc = {
        header,
        content: pageBody,
    };
    // Save the document
    // Packer.toBlob(doc).then((blob) => {
    //     saveAs(blob, fileName);
    // });
    pdfMake.createPdf(doc).download(fileName);
};
