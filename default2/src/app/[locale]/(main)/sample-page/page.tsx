import CardBox from '@/app/components/shared/CardBox'
const page = () => {
  return (
    <>
      <CardBox className="flex flex-col gap-3">
        <h5 className="card-title">Sample page 2</h5>
        <p className="text-bodytext">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
      </CardBox>
    </>
  )
}

export default page
