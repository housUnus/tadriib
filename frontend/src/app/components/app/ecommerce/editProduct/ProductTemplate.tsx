import { Card } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import React from "react";
import CardBox from "@/app/components/shared/CardBox";

const Producttemplate = () => {
  return (
    <>
      <CardBox>
        <h5 className="card-title mb-4">Product Template</h5>
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="temp">Select a product template</Label>
            <span className="text-error ms-1">*</span>
          </div>
          <Select required>
            <SelectTrigger id="temp" className="select-md">
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="default">Default Template</SelectItem>
              <SelectItem value="office">Office Stationary</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
            </SelectContent>
          </Select>
          <small className="text-xs text-text-ld">
            Assign a template from your current theme to define how a single
            product is displayed.
          </small>
        </div>
      </CardBox>
    </>
  );
};

export default Producttemplate;
