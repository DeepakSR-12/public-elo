import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore/lite";
import db from "./db";
import { CompanyData } from "@/constants";

export const retrieveCompaniesData = async () => {
  const companiesCol = collection(db, "companies");
  const companySnapshot = await getDocs(companiesCol);
  const companyList = companySnapshot.docs.map((doc) => doc.data());
  return companyList;
};

export const addCompany = async (companyData: CompanyData) => {
  try {
    const companiesCol = collection(db, "companies");

    // Check if the company already exists
    const companyQuery = query(
      companiesCol,
      where("name", "==", companyData.companyName)
    );
    const companySnapshot = await getDocs(companyQuery);

    if (!companySnapshot.empty) {
      console.log("Company already exists");
      return { message: "Company already exists" };
    }

    // Add the new company document to the "companies" collection
    await addDoc(companiesCol, companyData);
    return { message: "Company added successfully" };
  } catch (error) {
    console.error("Error adding company: ", error);
    return { error };
  }
};

export const updateCompany = async (
  companyName: string,
  field: string,
  value: string
) => {
  try {
    console.log({ companyName, field, value });
    const companiesCol = collection(db, "companies");

    // Check if the company already exists
    const companyQuery = query(companiesCol, where("companyName", "==", companyName));
    const companySnapshot = await getDocs(companyQuery);

    if (companySnapshot.empty) {
      console.log("Company does not exist");
      return { message: "Company does not exist" };
    }

    // Get the document reference of the company
    const companyDoc = companySnapshot.docs[0].ref;

    // Update the summary field of the company document
    await updateDoc(companyDoc, { [field]: value });
    return { message: "Company summary updated successfully" };
  } catch (error) {
    console.error("Error updating company: ", error);
    return { error };
  }
};
