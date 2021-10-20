import { Document, Packer, Paragraph, TextRun, Header, AlignmentType, PageBreak } from "docx";
import { saveAs } from "file-saver";

// Returns the equivalent pageBody
export const formatUserReport = (reportInfo) => {
    const {
        name, 
        orderStatus, 
        totalClients, 
        totalOrders, 
        totalRevenue 
    } = reportInfo;

    // Format attrivutes
    const nameFormat = new TextRun({
        text: `${name} - Report`,
        bold: true,
        font: "Calibri",
        size: 40,
    });
    const orderStatusFormat = Object.entries(orderStatus).map(([k, v]) => {
        return (
            new Paragraph({
                bullet: { level: 0 },
                children: [
                    new TextRun({
                        text: `${v} - ${k.toLowerCase()}`,
                        font: "Calibri"
                    })
                ]
            })
        )
    });
    const totalOrdersFormat = new TextRun({
        text: `Total Orders = ${totalOrders}`,
        font: "Calibri",
    });

    const totalClientsFormat = new TextRun({
        text: `Number of clients = ${totalClients}`,
        font: "Calibri",
    });

    const totalRevenueFormat = new TextRun({
        text: `Total revenue = $${totalRevenue}`,
        font: "Calibri",
        underline: true
    });

    // Combine for page body
    const pageBody = [
        // Title
        new Paragraph({
            children: [nameFormat]
        }),

        // Orders
        new Paragraph({
            children: [
                new TextRun({
                    text: "Orders",
                    font: "Calibri",
                    size: 24,
                    bold: true
                })
            ],
            spacing: { before: 200 }
        }),
        ...orderStatusFormat,
        new Paragraph({
            children: [totalOrdersFormat]
        }),

        // Clients and Revenue
        new Paragraph ({
            children: [
                new TextRun({
                    text: "Clients and Revenue",
                    font: "Calibri",
                    size: 24,
                    bold: true
                })
            ],
            spacing: { before: 200 }
        }),
        new Paragraph ({
            children: [totalClientsFormat]
        }),
        new Paragraph ({
            children: [totalRevenueFormat, new PageBreak()]
        })
    ];

    return pageBody;
}


// Create the actual document for report
export const createReport = (pageBody, fileName) => {
    // Get time of generation
    const date = new Date();
    const zeroPad = (num) => String(num).padStart(2, '0')
    // Format
    const dateTime = new TextRun({
        text: `Time Generated: ${zeroPad(date.getDate())}/${zeroPad(date.getMonth()+1)}/${date.getFullYear()} @ ${zeroPad(date.getHours())}:${zeroPad(date.getMinutes())}:${zeroPad(date.getSeconds())}`,
        font: "Calibri",
        allCaps: true,
    });

    // Make into doc
    const doc = new Document({
        sections: [{
            headers: {
                default: new Header({
                    children: [
                        new Paragraph({
                            alignment: AlignmentType.RIGHT,
                            children: [dateTime]
                        })
                    ]
                })
            },
            properties: {},
            children: pageBody,
        }],
    });
    // Save the document
    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, fileName);
    });
  }