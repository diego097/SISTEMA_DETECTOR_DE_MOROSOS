const { json } = require("body-parser");
const express = require("express");
const fetch = require("node-fetch");
const Router = express.Router();

//const tokenGenerate = getToken();
const token = "eyJraWQiOiIyMDIxMDUyMDE4MzYiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJJQk1pZC01NTAwMDlEVEtIIiwiaWQiOiJJQk1pZC01NTAwMDlEVEtIIiwicmVhbG1pZCI6IklCTWlkIiwianRpIjoiYWYwOTM3MmMtMWY3Yi00MzY2LWFmYmUtMmMzYzUwYTBjOTE2IiwiaWRlbnRpZmllciI6IjU1MDAwOURUS0giLCJnaXZlbl9uYW1lIjoiRGllZ28gTm9yZWwiLCJmYW1pbHlfbmFtZSI6IlZlZ2EgTWVqaWEiLCJuYW1lIjoiRGllZ28gTm9yZWwgVmVnYSBNZWppYSIsImVtYWlsIjoiZGllZ28udm1lamlhQHVuYXMuZWR1LnBlIiwic3ViIjoiZGllZ28udm1lamlhQHVuYXMuZWR1LnBlIiwiYXV0aG4iOnsic3ViIjoiZGllZ28udm1lamlhQHVuYXMuZWR1LnBlIiwiaWFtX2lkIjoiaWFtLTU1MDAwOURUS0giLCJuYW1lIjoiRGllZ28gTm9yZWwgVmVnYSBNZWppYSIsImdpdmVuX25hbWUiOiJEaWVnbyBOb3JlbCIsImZhbWlseV9uYW1lIjoiVmVnYSBNZWppYSIsImVtYWlsIjoiZGllZ28udm1lamlhQHVuYXMuZWR1LnBlIn0sImFjY291bnQiOnsidmFsaWQiOnRydWUsImJzcyI6Ijg5MmUzNDRjYTRiMTQ3YTE4NjFjZDI4ZWExMGIwYTlmIiwiZnJvemVuIjp0cnVlfSwiaWF0IjoxNjIxODYxNTIyLCJleHAiOjE2MjE4NjUxMjIsImlzcyI6Imh0dHBzOi8vaWFtLmNsb3VkLmlibS5jb20vaWRlbnRpdHkiLCJncmFudF90eXBlIjoidXJuOmlibTpwYXJhbXM6b2F1dGg6Z3JhbnQtdHlwZTphcGlrZXkiLCJzY29wZSI6ImlibSBvcGVuaWQiLCJjbGllbnRfaWQiOiJkZWZhdWx0IiwiYWNyIjoxLCJhbXIiOlsicHdkIl19.YE88ABrbmTtFFWTrawkljrM_R32RCuPmhVJq1CVNt1LjxnihXH5yNUJB22DeQ28lX9nim5pPSj9G7jNbd8HFkrwIO1i1UOpWkdGbpA8A46S068zqDL1-4oKcKiTQY0Jkk5byNsfhp31p06zl_AneEhYr9iWo2_lgRDtTMBpXyempm9BaVE-LnpNS-WHrjqaEslq2AILsdvPEgKBWxHGE1VkfsNzZaVB4vKIIVk7OaiaJRT30Aw5WlziS_cF1Cd6Xn5s0Hf0RVi8e92KBP0gaVa6FH3npG9BiwgNlsZNFdYAm47LBkgCEt_dWEZMwh4NlFWDZd1GUHlEZmmx0NaiB1Q";


Router.get("/", (req, res) => {
    res.render("index.ejs");
});
Router.post("/", (req, res) => {
    //const usuario = req.body;
    const consultaMoroso = JSON.stringify({
        input_data: [{
            fields: [
                "CustomerID",
                "Age",
                "Months as a Customer",
                "Number of Products",
                "Average Balance Feed Index",
                "Personal Debt to Equity Ratio",
                "Has Bad Payment Record",
                "Marital Status",
                "Age Youngest Child",
                "Number of Workers in Household",
                "Income",
            ],
            values: [
                [
                    JSON.parse(req.body.CustomerID),
                    JSON.parse(req.body.Age),
                    JSON.parse(req.body.MonthsCustomer),
                    JSON.parse(req.body.NumberProducts),
                    JSON.parse(req.body.Average),
                    JSON.parse(req.body.EquityRatio),
                    JSON.parse(req.body.HasBadPayment),
                    req.body.MaritalStatus,
                    JSON.parse(req.body.YoungestChild),
                    JSON.parse(req.body.WorkersHousehold),
                    JSON.parse(req.body.Income),
                ],
            ],
        }, ],
    });

    const myHeaders = new fetch.Headers();
    myHeaders.append("authorization", `Bearer ${token}`);
    fetch(
            "https://us-south.ml.cloud.ibm.com/ml/v4/deployments/e9e6b04b-c69c-4a11-843a-30ddfca8d844/predictions?version=2020-10-29", {
                method: "POST",
                headers: myHeaders,
                body: consultaMoroso,
            }
        )
        .then((res) => res.json())
        .then((json) => {
            //console.log(json)
            const valores = JSON.stringify(json);


            formatDataJS = JSON.parse(valores)
            const element = formatDataJS.predictions[0].values[0];
            //formatElement = JSON.parse(element);

            if (element[0] == "F") {
                res.render('noCalifica', formatDataJS)

            } else {
                res.render('califica', formatDataJS)
                console.log(element)
            }





        });
});

function getToken() {


}
module.exports = Router;