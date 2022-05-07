const express = require("express");
const { googleapis, google } = require("googleapis");
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
const app = express();
const port = process.env.PORT;

// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.get("/", (req, res) => {
    res.sendFile('../components/Product.js')
});

if (process.env.NODE_ENV == 'production') {
    app.use(express.static("../client/build"))
}

app.get("/api/products", async(req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "bries-boutique-credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1pqKkS7yCuy-fM-LKo2YmGZwYChQOhHZhBVVP1VaqnOM";

    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    })

    const getRows = await googleSheets.spreadsheets.values.get({

        auth,
        spreadsheetId,
        range: "Product!S2:S"
    })

    const keyInSheet = [...getRows.data.values];
    // console.log(keyInSheet)
    res.send(keyInSheet)
});

app.get("/api/orders", async(req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "bries-boutique-credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1pqKkS7yCuy-fM-LKo2YmGZwYChQOhHZhBVVP1VaqnOM";

    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    })

    const getRows = await googleSheets.spreadsheets.values.get({

        auth,
        spreadsheetId,
        range: "Orders"
    })

    const keyInSheet = [...getRows.data.values];
    // console.log(keyInSheet)
    res.send(keyInSheet)
});

app.get("/api/customers", async(req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "bries-boutique-credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1pqKkS7yCuy-fM-LKo2YmGZwYChQOhHZhBVVP1VaqnOM";

    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    })

    const getRows = await googleSheets.spreadsheets.values.get({

        auth,
        spreadsheetId,
        range: "Customer"
    })

    const keyInSheet = [...getRows.data.values];

    // const keysNotInSheet = [
    //     ...new Set([
    //         ...Object.keys(a).filter((key)=>)
    //     ])
    // ] 

    // console.log(keyInSheet)
    res.send(keyInSheet)
});

app.get("/api/purchases", async(req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "bries-boutique-credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1pqKkS7yCuy-fM-LKo2YmGZwYChQOhHZhBVVP1VaqnOM";

    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    })

    const getRows = await googleSheets.spreadsheets.values.get({

        auth,
        spreadsheetId,
        range: "PurchaseNew"
    })

    const keyInSheet = [...getRows.data.values];
    // console.log(keyInSheet)
    res.send(keyInSheet)
});


app.get("/api/dealers", async(req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "bries-boutique-credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1pqKkS7yCuy-fM-LKo2YmGZwYChQOhHZhBVVP1VaqnOM";

    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    })

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Customer!F:G"
    })

    const keyInSheet = [...getRows.data.values];
    // console.log(keyInSheet)
    res.send(keyInSheet)
});

// POST REQUESTS
app.post("/api/orders", async(req, res) => {
    const {
        Date,
        Customer,
        Product,
        Courier,
        DC,
        CheckDC,
        CheckPayment,
        TrackingNo
    } = req.body;
    console.log(Date, Customer, Product, Courier, DC, CheckDC, CheckPayment, TrackingNo);

    const auth = new google.auth.GoogleAuth({
        keyFile: "bries-boutique-credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1pqKkS7yCuy-fM-LKo2YmGZwYChQOhHZhBVVP1VaqnOM";


    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "OrdersNew!B:B"
    })
    const OrderNoRows = [...getRows.data.values]
    const lastOrder = OrderNoRows ? Number(OrderNoRows[OrderNoRows.length - 1][0]) : None;
    const OrderNo = lastOrder + 1;

    Product.forEach(element => {
        console.log(element);
        // Write row(s) to spreadsheet
        googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "OrderNew!A:O",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [Date, OrderNo, Customer.name, Customer.phone, Customer.address, Product[0].qty, Product[0].amount, 0, Product[0].code, Product[0].desc, DC, CheckDC, Courier, "", TrackingNo, CheckPayment]
                ]
            },
        });
    });
    // console.log(req.body);
    res.send("Success");

})

app.post("/api/purchases", async(req, res) => {
    const {
        Date,
        BillNo,
        Dealer,
        Purchase,
        Type,
        Payment
    } = req.body;
    console.log(Date, Dealer, Purchase, Type, Payment);

    const auth = new google.auth.GoogleAuth({
        keyFile: "bries-boutique-credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1pqKkS7yCuy-fM-LKo2YmGZwYChQOhHZhBVVP1VaqnOM";

    Purchase.forEach(element => {
        console.log(element);
        // Write row(s) to spreadsheet
        googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "PurchaseNew!A:K",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [
                    [Date, Date, Dealer.name, Dealer.address, Type, Purchase[0].desc, BillNo, Purchase[0].qty, Purchase[0].amount, Payment, Purchase[0].code]
                ]
            },
        });
    });
    console.log(req.body);
    res.send("Success");

})

app.listen(port, (req, res) => console.log(`running on ${port}`));