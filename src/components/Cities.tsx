import React, { ChangeEvent, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useMultiStepForm } from "@/context/FormContext";
import { Button } from "./ui/button";

const Cities = () => {
  const { setFormField, formFields } = useMultiStepForm();
  const [city, setCity] = useState({
    name: "",
    date: "",
  });
  const addCity = () => {
    setFormField("cities", city);
    setCity({
      name: "",
      date: "",
    });
  };

  const handleCity = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);

    setCity((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="grid gap-2 space-y-2">
      <div className="flex gap-3 flex-wrap">
        {formFields.cities.map((city, i) => (
          <div key={i} className="">
            <span className="text-xs bg-blue-500 rounded-lg text-white p-2">
              {city.name}
            </span>
          </div>
        ))}
      </div>
      <div className="grid gap-1">
        <Label htmlFor="city">Name</Label>
        <Input
          name="name"
          value={city.name}
          id="city"
          placeholder="Accra"
          type="text"
          onChange={handleCity}
          autoCapitalize="none"
          autoComplete="name"
          autoCorrect="off"
          required
        />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="date_arrived">Date of Arrival</Label>
        <Input
          name="date"
          value={city.date}
          id="date_arrived"
          type="date"
          onChange={handleCity}
          autoCapitalize="none"
          autoCorrect="off"
          required
        />
      </div>

      <Button
        disabled={!city.name || !city.date}
        type="button"
        onClick={addCity}
      >
        Add City
      </Button>
    </div>
  );
};

export default Cities;
