import express from "express";

import { postQuery, getQuery, createSMan, createSMOff, getLocationBasedServices } from "./database.js";

const app = express();

app.use(express.json());

app.get("/get/:query", async (req, res) => {
	const querystring = req.params.query;
	const result = await getQuery(querystring);
	res.send(result);
});

app.get("/getLocationBasedServices/:C_Lat/:C_Lon/:Radius", async (req, res) => {
	const C_Lat = req.params.C_Lat;
	const C_Lon = req.params.C_Lon;
	const Radius = req.params.Radius;
	const result = await getLocationBasedServices([C_Lat, C_Lon, Radius]);
	res.send(result);
});

app.post("/post", async (req, res) => {
	const { querystring } = req.body;
	const result = await postQuery(querystring);
	res.send(result);
});

app.post("/postSMan", async (req, res) => {
	const {
		SMan_AadhaarNo,
		SMan_AadhaarURL,
		SMan_Address,
		SMan_Age,
		SMan_Allowed,
		SMan_Character,
		SMan_City,
		SMan_CurrentLocation,
		SMan_DocVerifyStatus,
		SMan_Equipments,
		SMan_Experience,
		SMAN_Experience_Story,
		SMan_Flag,
		SMan_Images,
		SMan_LanguagesSpoken,
		SMan_Level,
		SMan_Name,
		SMan_OnlineStatus,
		SMan_PhNo,
		SMan_Pincode,
		SMan_PoliceVerification,
		SMan_ProfilePic,
		SMan_PTOs,
		SMan_Resume,
		SMan_Shop,
		SMan_Team,
		SMan_TotalBookings,
		SMan_Website,
		SMan_Weekdays,
	} = req.body;
	const note = await createSMan([
		SMan_AadhaarNo,
		SMan_AadhaarURL,
		SMan_Address,
		SMan_Age,
		SMan_Allowed,
		SMan_Character,
		SMan_City,
		SMan_CurrentLocation,
		SMan_DocVerifyStatus,
		SMan_Equipments,
		SMan_Experience,
		SMAN_Experience_Story,
		SMan_Flag,
		SMan_Images,
		SMan_LanguagesSpoken,
		SMan_Level,
		SMan_Name,
		SMan_OnlineStatus,
		SMan_PhNo,
		SMan_Pincode,
		SMan_PoliceVerification,
		SMan_ProfilePic,
		SMan_PTOs,
		SMan_Resume,
		SMan_Shop,
		SMan_Team,
		SMan_TotalBookings,
		SMan_Website,
		SMan_Weekdays,
	]);
	res.status(201).send(note);
});

app.post("/postSMOff", async (req, res) => {
	const { S_ID, SMan_PhNo, SMOff_BasePrice, SubS_ID } = req.body;
	const note = await createSMOff([S_ID, SMan_PhNo, SMOff_BasePrice, SubS_ID]);
	res.status(201).send(note);
});

app.post("/postBooking", async (req, res) => {
	const {
		B_Address,
		B_DateTime,
		B_ExtraCost,
		B_Flag,
		B_ID,
		B_PaymentMode,
		B_Price,
		B_Status,
		B_StatusDetails,
		C_PhNo,
		Coup_ID,
		SMan_PhNo,
		SubS_ID,
	} = req.body;
	const note = await createBooking([
		B_Address,
		B_DateTime,
		B_ExtraCost,
		B_Flag,
		B_ID,
		B_PaymentMode,
		B_Price,
		B_Status,
		B_StatusDetails,
		C_PhNo,
		Coup_ID,
		SMan_PhNo,
		SubS_ID,
	]);
	res.status(201).send(note);
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke 💩");
});

app.listen(8080, () => {
	console.log("Server is running on port 8080");
});

/*app.get("/emp", async (req, res) => {
  const notes = await getEmps()
  res.send(notes)
})

app.get("/emp/:id", async (req, res) => {
  const id = req.params.id
  const note = await getEmp(id)
  res.send(note)
})

app.post("/emp", async (req, res) => {
  const { uname, umail, upass, ucountry } = req.body
  const note = await createEmp(uname, umail, upass, ucountry)
  res.status(201).send(note)
})

app.get("/pet", async(req, res) => {
    const [items] = await execQuery("SELECT * FROM pet;")
    console.log(items)
    res.send(items)
})*/
