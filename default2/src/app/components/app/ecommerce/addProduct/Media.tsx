"use client"
import FileUploadMotion from "@/app/components/animatedComponents/FileUploadMotion";
import CardBox from "@/app/components/shared/CardBox";
const Media = () => {
  return (
    <>
      <CardBox>
        <h5 className="card-title mb-4">Media</h5>
        <FileUploadMotion />
      </CardBox>
    </>
  );
};

export default Media;
