"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Cities from "./Cities";
import { useMultiStepForm } from "@/context/FormContext";
import { Card, CardContent, CardHeader } from "./ui/card";

interface FormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Form({ className, ...props }: FormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { formFields, setFormField } = useMultiStepForm();

  //@ts-ignore
  async function handleForm(e) {
    e.preventDefault();
    if (step < 1) {
      setStep((step) => step + 1);
      return;
    }

    try {
      setIsLoading(true);

      setStep((step) => step + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const [step, setStep] = React.useState(0);
  return (
    <div className={cn("grid gap-6 ", className)} {...props}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {step < 1
            ? "Personal Information"
            : step != 2
            ? "Cities Travelled"
            : "Details"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {step < 1
            ? "Fill the form below to get started"
            : step != 2
            ? "Please provide the names of cities you have visited and dates of arrival"
            : "Please check the provided details"}
        </p>
      </div>

      <form>
        {step === 0 && (
          <div className="grid gap-2 space-y-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1">
                <Label htmlFor="city_name">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formFields.firstName}
                  placeholder="Accra"
                  type="text"
                  onChange={(e) => setFormField("firstName", e.target.value)}
                  autoCapitalize="none"
                  required
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="Name">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formFields.lastName}
                  placeholder="Doe"
                  type="text"
                  onChange={(e) => setFormField("lastName", e.target.value)}
                  autoCapitalize="none"
                  autoComplete="lastname"
                  required
                  autoCorrect="off"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="grid gap-1">
              <Label htmlFor="contact">Date of Birth</Label>
              <Input
                id="dob"
                name="dob"
                value={formFields.dob}
                type="date"
                onChange={(e) => setFormField("dob", e.target.value)}
                autoCapitalize="none"
                required
                autoCorrect="off"
                disabled={isLoading}
              />
            </div>
          </div>
        )}
        {step === 1 && <Cities />}

        {step !== 2 && (
          <div className="my-4 flex justify-around">
            {step > 0 && step < 2 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep((step) => step - 1)}
                disabled={isLoading}
              >
                Back
              </Button>
            )}

            {step < 1 && (
              <Button type="button" onClick={handleForm} disabled={isLoading}>
                Next
              </Button>
            )}

            {step >= 1 && (
              <Button type="submit" onClick={handleForm} disabled={isLoading}>
                Submit
              </Button>
            )}
          </div>
        )}
        {step > 1 && (
          <Card className="w-[400px]">
            <CardHeader>
              <div>
                <h1 className="text-xl font-bold text-center">
                  Personal Details
                </h1>

                <div className="flex flex-wrap gap-3">
                  <div className="col-span-6">
                    <span className="font-bold mr-1"> First Name:</span>
                    {formFields.firstName}
                  </div>
                  <div>
                    <span className="font-bold mr-1">Last Name:</span>
                    {formFields.firstName}
                  </div>
                  <div>
                    <span className="font-bold mr-1">Date of Birth:</span>
                    {formFields.dob}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <h1>Cities Visited</h1>
              <Table>
                <TableCaption>A list of cities you have visited</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Date of Arrival</TableHead>

                    <TableHead className="text-right">City Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formFields.cities.map((city, i) => (
                    <TableRow key={i}>
                      <TableCell>{city.date}</TableCell>
                      <TableCell className="text-right">{city.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
}
