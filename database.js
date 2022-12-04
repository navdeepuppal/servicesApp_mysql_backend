import mysql from "mysql2";

const pool = mysql
	.createPool({
		host: "192.168.29.195",
		port: 3307,
		user: "root",
		password: "admin",
		database: "ServicesDB",
	})
	.promise();
console.log("Connection Succesful");

export async function getQuery(querystring) {
	const [result] = await pool.query(querystring);
	return result;
}

export async function getLocationBasedServices(C_Coords) {
	const [C_Lat, C_Lon, Radius] = C_Coords;
	const [result] = await pool.query(
		`SELECT * FROM service where S_ID in (
			select S_ID from subservice where SubS_ID in (
				select SubS_ID from servicemanofferings where SMan_PhNo in (
					select SMan_PhNo from serviceman where 2*6371*ASIN(
						SQRT(
							POWER(
								SIN((
									PI()/180*(
										?-SMan_CurrentLocation->>'$.latitude'
									)
								)/2),2
							)+(
								COS(PI()/180*?)*COS(PI()/180*SMan_CurrentLocation->>'$.latitude')*
								POWER(
									SIN((
										PI()/180*(
											?-SMan_CurrentLocation->>'$.longitude'
										)
									)/2),2
								)
							)
						)
					) < ?
				)
			)
		)`,
		[C_Lat, C_Lat, C_Lon, Radius]
	);
	return result;
}

export async function postQuery(querystring) {
	const [result] = await pool.query(querystring);
	return result;
}

export async function createSMan(SMan_Details) {
	const [
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
	] = SMan_Details;
	const [result] = await pool.query(
		"INSERT INTO `servicesdb`.`serviceman`(`SMan_AadhaarNo`,`SMan_AadhaarURL`,`SMan_Address`,`SMan_Age`,`SMan_Allowed`,`SMan_Character`,`SMan_City`,`SMan_CurrentLocation`,`SMan_DocVerifyStatus`,`SMan_Equipments`,`SMan_Experience`,`SMAN_Experience_Story`,`SMan_Flag`,`SMan_Images`,`SMan_LanguagesSpoken`,`SMan_Level`,`SMan_Name`,`SMan_OnlineStatus`,`SMan_PhNo`,`SMan_Pincode`,`SMan_PoliceVerification`,`SMan_ProfilePic`,`SMan_PTOs`,`SMan_Resume`,`SMan_Shop`,`SMan_Team`,`SMan_TotalBookings`,`SMan_Website`,`SMan_Weekdays`)VALUES(?,?,JSON_ARRAY(?),?,?,?,?,JSON_ARRAY(?),?,?,?,?,?,JSON_ARRAY(?),JSON_ARRAY(?),?,?,?,?,?,?,?,JSON_ARRAY(?),?,?,?,?,?,JSON_ARRAY(?));",
		[
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
		]
	);
	return result;
}

export async function createSMOff(SMOff_Details) {
	const [S_ID, PhoneNumber, SMOff_BasePrice, SubS_ID] = SMOff_Details;
	const [result] = await pool.query(
		"INSERT INTO `servicesdb`.`servicemanofferings`(`S_ID`,`SMan_PhNo`,`SMOff_BasePrice`,`SubS_ID`)VALUES(?,?,?,?);",
		[S_ID, PhoneNumber, SMOff_BasePrice, SubS_ID]
	);
	return result;
}

export async function createBooking(Booking_Details) {
	const [
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
	] = SMOff_Details;
	const [result] = await pool.query(
		"INSERT INTO `servicesdb`.`booking`(`B_Address`,`B_DateTime`,`B_ExtraCost`,`B_Flag`,`B_ID`,`B_PaymentMode`,`B_Price`,`B_Status`,`B_StatusDetails`,`C_PhNo`,`Coup_ID`,`SMan_PhNo`,`SubS_ID`)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",
		[
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
		]
	);
	return result;
}

/*export async function getEmps() {
	const [rows] = await pool.query("SELECT * FROM emp");
	return rows;
}

export async function getEmp(id) {
	const [rows] = await pool.query(
		`
	SELECT * 
	FROM emp
	WHERE umail = ?
	`,
		[id]
	);
	return rows[0];
}

export async function createEmp(uname, umail, upass, ucountry) {
	const [result] = await pool.query(
		`
	INSERT INTO emp (uname, umail, upass, ucountry)
	VALUES (?, ?, ?, ?)
	`,
		[uname, umail, upass, ucountry]
	);
	return getEmp(umail);
}*/
