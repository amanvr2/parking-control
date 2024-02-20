// MyPdfDocument.js
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";
import JsPDF from "jspdf";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "flex",
    flexFlow: "column",
    flexDirection: "column",

    width: "100%",
    border: "1px solid #000",
    borderCollapse: "collapse",
  },
  tableHeader: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    flexFlow: "row",
    width: "100%",
    backgroundColor: "#f2f2f2",
    border: "1px solid #000",
    textAlign: "center",
    padding: 5,
  },
  tableRow: {
    border: "1px solid #000",
    display: "flex",
    flexFlow: "column",
  },
  tableCell: {
    borderRight: "1px solid #000",
    borderLeft: "1px solid #000",
    padding: 5,
    textAlign: "center",
  },
});

const MyPdfDocument = ({ tableData }) => {
  if (!tableData || tableData.length === 0) {
    return null; // If tableData is empty or undefined, return null
  }

  const headers = Object.keys(tableData[0]);

  return (
    <Document>
      <Page size="A4 landscape" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              {headers.map((header, index) => (
                <Text
                  key={index}
                  style={{
                    ...styles.tableCell,
                    minWidth: "200px",
                  }}
                >
                  {header}
                </Text>
              ))}
            </View>
            <View
              style={{
                display: "flex",
                flexFlow: "column",
                flexDirection: "column",
                flexWrap: "nowrap",
              }}
            >
              {tableData.map((row, rowIndex) => (
                <View
                  key={rowIndex}
                  style={{
                    display: "flex",
                    flexFlow: "row",
                    flexDirection: "row",
                  }}
                >
                  {headers.map((header, cellIndex) => (
                    <Text
                      key={cellIndex}
                      style={{ height: "100px", width: "200px" }}
                    >
                      {row[header]}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const PdfDownloadButton = ({ tableData }) => (
  <PDFDownloadLink
    document={<MyPdfDocument tableData={tableData} />}
    fileName="my-table-document.pdf"
  >
    {({ blob, url, loading, error }) =>
      loading ? "Loading document..." : "Download now!"
    }
  </PDFDownloadLink>
);

const ExportPdf = () => {
  const tableData = [
    { visitingUnit: "101", visitorName: "aman" },
    { visitingUnit: "102", visitorName: "john" },

    // Add more rows as needed
  ];

  return (
    <>
      {console.log(tableData)}
      <div>
        <h1>Export Data as PDF</h1>
        <PdfDownloadButton tableData={tableData} />
      </div>
    </>
  );
};

export default ExportPdf;
