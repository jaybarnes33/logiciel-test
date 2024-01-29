import React, { createContext, useContext, useState, ReactNode } from "react";

interface FormFields {
  firstName: string;
  lastName: string;
  dob: string;
  cities: { name: string; date: string }[];
}

interface MultiStepFormContextType {
  formFields: FormFields;
  setFormField: (
    field: string,
    value: string | { name: string; date: string }
  ) => void;
}

const initialFormFields: FormFields = {
  firstName: "",
  lastName: "",
  dob: "",
  cities: [],
};

const MultiStepFormContext = createContext<
  MultiStepFormContextType | undefined
>(undefined);

const MultiStepFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formFields, setFormFields] = useState<FormFields>(initialFormFields);

  const setFormField = (
    field: string,
    value: string | { name: string; date: string }
  ) => {
    field !== "cities"
      ? setFormFields((prevFields) => ({ ...prevFields, [field]: value }))
      : setFormFields((prev) => ({
          ...prev,
          cities: [...prev.cities, value as { name: string; date: string }],
        }));
  };

  const contextValue: MultiStepFormContextType = {
    formFields,
    setFormField,
  };

  return (
    <MultiStepFormContext.Provider value={contextValue}>
      {children}
    </MultiStepFormContext.Provider>
  );
};

const useMultiStepForm = (): MultiStepFormContextType => {
  const context = useContext(MultiStepFormContext);
  if (!context) {
    throw new Error(
      "useMultiStepForm must be used within a MultiStepFormProvider"
    );
  }
  return context;
};

export { MultiStepFormProvider, useMultiStepForm };
