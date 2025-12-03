"use client";

import CardBox from "../../shared/CardBox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ContactForm = () => {
  return (
    <div className="container-1218 mx-auto mt-7">
      <div className="grid grid-cols-12 lg:gap-7 gap-6">
        {/* Left side info card */}
        <div className="lg:col-span-4 col-span-12">
          <div className="overflow-hidden rounded-tw bg-primary relative p-8 after:absolute after:content-[''] after:bg-[url('/images/front-pages/background/contact-icon.png')] after:bg-no-repeat after:bg-top-right after:top-0 after:right-0 after:w-[325px] after:h-[325px]">
            <h5 className="text-lg font-bold text-white pb-4">Reach Out Today</h5>
            <p className="text-base text-white leading-7">
              Have questions or need assistance? We're just a message away.
            </p>
            <Separator className="my-5 bg-white/10" />
            <h5 className="text-lg font-bold text-white pb-4">Our Location</h5>
            <p className="text-base text-white leading-7">
              Visit us in person or find our contact details to connect with us directly.
            </p>
          </div>
        </div>

        {/* Right side form */}
        <div className="lg:col-span-8 col-span-12">
          <CardBox>
            <div className="grid grid-cols-12 lg:gap-7 gap-6">
              {/* First Name */}
              <div className="lg:col-span-6 col-span-12">
                <Label htmlFor="nm" className="mb-2 block">
                  First Name *
                </Label>
                <Input id="nm" type="text" placeholder="Name" required />
              </div>

              {/* Last Name */}
              <div className="lg:col-span-6 col-span-12">
                <Label htmlFor="lnm" className="mb-2 block">
                  Last Name *
                </Label>
                <Input id="lnm" type="text" placeholder="Last Name" required />
              </div>

              {/* Phone */}
              <div className="lg:col-span-6 col-span-12">
                <Label htmlFor="ph" className="mb-2 block">
                  Phone Number *
                </Label>
                <Input id="ph" type="number" placeholder="xxx xxx xxxx" required />
              </div>

              {/* Email */}
              <div className="lg:col-span-6 col-span-12">
                <Label htmlFor="em" className="mb-2 block">
                  Email *
                </Label>
                <Input id="em" type="email" placeholder="Email address" required />
              </div>

              {/* Select */}
              <div className="col-span-12">
                <Label htmlFor="inq" className="mb-2 block">
                  Enquire related to *
                </Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Enquiry</SelectItem>
                    <SelectItem value="other">Other Enquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="col-span-12">
                <Label htmlFor="msg" className="mb-2 block">
                  Message
                </Label>
                <Textarea
                  id="msg"
                  placeholder="Write your message here..."
                  required
                  className="rounded-md"
                  rows={4}
                />
              </div>

              {/* Button */}
              <div className="col-span-12">
                <Button className="sm:w-auto w-full ms-auto bg-primary text-white hover:bg-primary/90">
                  Send Message
                </Button>
              </div>
            </div>
          </CardBox>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
