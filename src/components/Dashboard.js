import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Collapse from "@mui/material/Collapse";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
import { useReactToPrint } from "react-to-print";

export default function Dashboard({ addVehicle, vehicleData }) {
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <>
      <div className="visitorAddedMsg">
        <Box sx={{ width: "30%", marginLeft: "35px" }}>
          <Collapse in={openAlert}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Visitor added
            </Alert>
          </Collapse>
        </Box>
      </div>

      <VehicleList
        data={vehicleData}
        addVehicle={addVehicle}
        setShowSuccess={setOpenAlert}
      />
    </>
  );
}

export function VehicleList({ data, addVehicle, setShowSuccess }) {
  const pdfRef = useRef();
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(true); // Initialize loading state
  const pdfdownloader = useReactToPrint({
    content: () => pdfRef.current,
  });

  useEffect(() => {
    setLoading(false);
    setShow(data.length > 0);
  }, [data]);

  return (
    <>
      <div className="buttons-main">
        <AddModal
          addVehicle={addVehicle}
          vehicleData={data}
          setShowSuccess={setShowSuccess}
        />

        {show && (
          <button
            onClick={pdfdownloader}
            className="btn btn-dark downloadDataBtn"
          >
            Download Data
          </button>
        )}
      </div>

      {!loading && (
        <>
          {show ? (
            <>
              <div ref={pdfRef} className="vehcileTable">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Visiting Unit</th>
                      <th scope="col">Visitor Name</th>
                      <th scope="col">From</th>
                      <th scope="col">To</th>
                      <th scope="col">Vehicle Make</th>
                      <th scope="col">Vehicle Color</th>
                      <th scope="col">License Plate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((dat) => (
                      <tr key={Math.random()}>
                        <td>{dat.visitingUnit}</td>
                        <td>{dat.visitorName}</td>
                        <td>{new Date(dat.from).toLocaleString()}</td>
                        <td>{new Date(dat.to).toLocaleString()}</td>
                        <td>{dat.vehicleMake}</td>
                        <td>{dat.vehicleColor}</td>
                        <td>{dat.licensePlate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ): ( <div className="noRecords">No Record</div>)}
        </>
      )}
    </>
  );
}

function AddModal({ addVehicle, vehicleData, setShowSuccess }) {
  const [visitingUnit, setVisitingUnit] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [from, setFrom] = useState(dayjs(new Date()));
  const [to, setTo] = useState(dayjs(new Date()));
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [comments, setComments] = useState("");
  const [province, setProvince] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [showModal, setShowModal] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const vehicle = {
      visitingUnit: visitingUnit,
      visitorName: visitorName,
      from: from.toDate().getTime(),
      to: to.toDate().getTime(),
      vehicleMake: vehicleMake,
      vehicleColor: vehicleColor,
      comments: comments,
      province: province,
      licensePlate: licensePlate,
    };

    setShowModal(false);
    setShowSuccess(true);
    addVehicle(vehicle);
  }
  // const exportToExcel = () => {
  //   // Convert array of objects to array of arrays
  //   const dataArray = vehicleData.map((item) => [
  //     item.visitingUnit,
  //     item.visitorName,
  //     new Date(item.from).toLocaleString(),
  //     new Date(item.to).toLocaleString(),
  //     item.vehicleMake,
  //     item.vehicleColor,
  //     item.comments,
  //     item.province,
  //     item.licensePlate,
  //   ]);

  //   // Create a worksheet
  //   const ws = XLSX.utils.aoa_to_sheet([
  //     [
  //       "Visiting Unit",
  //       "Visitor Name",
  //       "From",
  //       "To",
  //       "Vehicle Make",
  //       "Vehicle Color",
  //       "Comments",
  //       "Province",
  //       "License Plate",
  //     ],
  //     ...dataArray,
  //   ]);

  //   // Create a workbook
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

  //   // Convert the workbook to a binary Excel file (XLSX)
  //   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

  //   // Convert the array buffer to a blob
  //   const blob = new Blob([excelBuffer], {
  //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //   });

  //   // Save the blob as a file using FileSaver
  //   saveAs(blob, "exportedData.xlsx");
  // };

  return (
    <>
      <div className="buttons">
        <button
          type="button"
          className="btn btn-dark issueParkingBtn"
          onClick={() => setShowModal(true)}
        >
          Issue Parking Pass
        </button>

        {/* <button onClick={exportToExcel} className="btn btn-dark">
          Download Data
        </button> */}
      </div>

      {showModal && (
        <>
          <div className="modal" style={{ display: "block" }}>
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Vehicle
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <Box
                      sx={{
                        "& > :not(style)": { m: 1, width: "25ch" },
                      }}
                      autoComplete="off"
                    >
                      <TextField
                        required
                        label="Visiting Unit"
                        variant="outlined"
                        value={visitingUnit}
                        onChange={(e) => setVisitingUnit(e.target.value)}
                      />
                      <TextField
                        label="Visitor Name"
                        variant="outlined"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        required
                      />
                      <br />
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="From"
                          value={from}
                          onChange={(newValue) => setFrom(newValue)}
                          required
                        />
                        <DateTimePicker
                          label="To"
                          value={to}
                          onChange={(newValue) => setTo(newValue)}
                          required
                        />
                      </LocalizationProvider>

                      <br />
                      <TextField
                        label="Vehicle Make"
                        variant="outlined"
                        value={vehicleMake}
                        onChange={(e) => setVehicleMake(e.target.value)}
                        required
                      />
                      <TextField
                        label="Vehicle color"
                        variant="outlined"
                        value={vehicleColor}
                        onChange={(e) => setVehicleColor(e.target.value)}
                        required
                      />
                      <br />
                      <TextField
                        required
                        label="License Plate"
                        variant="outlined"
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                      />

                      <TextField
                        label="Province"
                        variant="outlined"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        required
                      />
                      <br />
                      <TextField
                        label="Comments"
                        variant="outlined"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        fullWidth
                      />
                      <br />
                      <button type="submit" className="btn btn-dark">
                        Add
                      </button>
                    </Box>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
