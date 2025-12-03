"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TiptapEdit from "../editor/TiptapEdit";
import CardBox from "@/app/components/shared/CardBox";

const GeneralDetail = () => {
  return (
    <>
      <CardBox>
        <h5 className="card-title mb-4">General</h5>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="prednm">Product Name</Label>
            <span className="text-error ms-1">*</span>
          </div>
          <Input
            id="prednm"
            type="text"
            className="form-control"
            placeholder="Product Name"
          />
          <small className="text-xs text-ld">
            A product name is required and recommended to be unique.
          </small>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="desc">Description</Label>
          </div>
          <TiptapEdit />
          <small className="text-xs text-ld">
            Set a description to the product for better visibility.
          </small>
        </div>
      </CardBox>
    </>
  );
};

export default GeneralDetail;
