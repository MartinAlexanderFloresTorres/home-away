'use client';

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";

const currencyFormat = {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2,
};

interface ListingReservationProps {
  price: number;
  dateRange: Range,
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<
  ListingReservationProps
> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
}) => {
  return ( 
    <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden shadow-xl'>
      <div className='flex flex-row items-center gap-1 p-4'>
        <div className="text-2xl font-semibold">
          {price.toLocaleString('es-MX', currencyFormat)} MXN
        </div>
        <div className="font-light text-neutral-600">
          noche
        </div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => 
          onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button 
          disabled={disabled} 
          label="Reservar" 
          onClick={onSubmit}
        />
      </div>
      <hr />
      <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
        <div>
          Total
        </div>
        <div>
          {totalPrice.toLocaleString('es-MX', currencyFormat)} MXN
        </div>
      </div>
    </div>
   );
}
 
export default ListingReservation;