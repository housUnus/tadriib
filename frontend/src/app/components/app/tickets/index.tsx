"use client";
import { Card } from "@/components/ui/card";
import TicketFilter from "@/app/components/app/tickets/TicketFilter";
import TicketListing from "@/app/components/app/tickets/TicketListing";
import { TicketProvider } from '@/app/context/TicketContext/index';
import CardBox from "../../shared/CardBox";


const TicketsApp = () => {
  return (
    <>
      <TicketProvider>
        <CardBox>
          <TicketFilter />
          <TicketListing />
        </CardBox>
      </TicketProvider>
    </>
  );
};

export default TicketsApp;
