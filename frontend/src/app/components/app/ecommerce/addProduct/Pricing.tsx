"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CardBox from "@/app/components/shared/CardBox";

const Pricing = () => {
  const [discountType, setDiscountType] = useState("no-discount");

  const handleRadioChange = (value: string) => {
    setDiscountType(value);
  };

  return (
    <CardBox>
      <h5 className="card-title mb-4">Pricing</h5>

      {/* Base Price */}
      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="prednm">Base Price</Label>
          <span className="text-error ms-1">*</span>
        </div>
        <Input
          id="prednm"
          type="text"
          className="form-control"
          placeholder="Product Price"
        />
        <small className="text-xs text-ld">
          Set the product price.
        </small>
      </div>

      {/* Discount Type */}
      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="disctype">Discount Type</Label>
        </div>

        <RadioGroup
          value={discountType}
          onValueChange={handleRadioChange}
          className="grid grid-cols-12 gap-6"
        >
          {/* No Discount */}
          <Label
            htmlFor="no-discount"
            className="lg:col-span-4 col-span-12"
          >
            <div className="border border-ld p-4 rounded-md hover:border-primary hover:bg-lightprimary cursor-pointer">
              <div className="flex items-center gap-4 sm:ps-2">
                <RadioGroupItem
                  value="no-discount"
                  id="no-discount"
                  className="cursor-pointer"
                />
                <span className="cursor-pointer text-ld font-semibold text-base mb-0">
                  No Discount
                </span>
              </div>
            </div>
          </Label>


          {/* Percentage */}
          <Label
            htmlFor="percentage"
            className="lg:col-span-4 col-span-12"
          >
            <div className="border border-ld p-4 rounded-md hover:border-primary hover:bg-lightprimary cursor-pointer">
              <div className="flex items-center gap-4 sm:ps-2">
                <RadioGroupItem
                  value="percentage"
                  id="percentage"
                  className="cursor-pointer"
                />

                <span className="cursor-pointer text-ld font-semibold text-base mb-0">
                  Percentage %
                </span>
              </div>
            </div>
          </Label>

          {/* Fixed Price */}
          <Label
            htmlFor="fixed-price"
            className="lg:col-span-4 col-span-12"
          >
            <div className="border border-ld p-4 rounded-md hover:border-primary hover:bg-lightprimary cursor-pointer">
              <div className="flex items-center gap-4 sm:ps-2">
                <RadioGroupItem
                  value="fixed-price"
                  id="fixed-price"
                  className="cursor-pointer"
                />

                <span className="cursor-pointer text-ld font-semibold text-base mb-0">
                  Fixed Price
                </span>
              </div>
            </div>
          </Label>

        </RadioGroup>

        {/* Percentage Slider */}
        {discountType === "percentage" && (
          <div className="col-span-12 my-6">
            <div className="mb-1 block">
              <Label htmlFor="discount-slider">Set Discount Percentage</Label>
            </div>
            <Slider
              id="discount-slider"
              max={100}
              step={1}
              defaultValue={[10]} // set a sensible default if needed
            />
            <small className="text-xs text-text-ld">
              Set a percentage discount to be applied on this product.
            </small>
          </div>
        )}

        {/* Fixed Price Input */}
        {discountType === "fixed-price" && (
          <div className="col-span-12 my-6">
            <div className="mb-2 block">
              <Label htmlFor="dis">Fixed Discounted Price</Label>
              <span className="text-error ms-1">*</span>
            </div>
            <Input
              id="dis"
              type="text"
              className="form-control"
              placeholder="Discounted Price"
            />
            <small className="text-xs text-text-ld">
              Set the discounted product price. The product will be reduced
              at the determined fixed price.
            </small>
          </div>
        )}
      </div>

      {/* Tax Class and VAT */}
      <div className="grid grid-cols-12 gap-6 mt-8">
        {/* Tax Class */}
        <div className="lg:col-span-6 col-span-12">
          <div className="mb-2 block">
            <Label htmlFor="tax-class">Tax Class</Label>
            <span className="text-error ms-1">*</span>
          </div>
          <Select required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tax Free">Tax Free</SelectItem>
              <SelectItem value="Taxable Goods">Taxable Goods</SelectItem>
              <SelectItem value="Downloadable Products">Downloadable Products</SelectItem>
            </SelectContent>
          </Select>
          <small className="text-xs text-ld">
            Set the product tax class.
          </small>
        </div>

        {/* VAT Amount */}
        <div className="lg:col-span-6 col-span-12">
          <div className="mb-2 block">
            <Label htmlFor="vat">VAT Amount (%)</Label>
            <span className="text-error ms-1">*</span>
          </div>
          <Input
            id="vat"
            type="text"
            className="form-control"
          />
          <small className="text-xs text-ld">
            Set the product VAT amount.
          </small>
        </div>
      </div>
    </CardBox>
  );
};

export default Pricing;
