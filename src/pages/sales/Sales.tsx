import './sales.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { InvoicesByDate } from '../../components/invoicesByDate/InvoicesByDate';

export const Sales = () => {
  const [initialDate, setInitialDate] = useState<Date>(new Date());
  const [finalDate, setFinalDate] = useState<Date>(new Date());

  initialDate.setUTCHours(0, 0, 0, 0);
  finalDate.setUTCHours(23, 59, 0, 0);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 30);

  return (
    <div className="sales common-container">
      <div className="row">
        <h1 className="title">Sales</h1>
      </div>
      <div className="row">
        <div className="date-pickers">
          <span className="text-muted">Order Date Between: </span>

          <DatePicker
            enableTabLoop={false}
            selected={new Date(initialDate.getTime() + initialDate.getTimezoneOffset() * 60000)}
            minDate={minDate}
            maxDate={new Date()}
            onChange={(date) => setInitialDate(date as Date)}
            className="form-control"
          />

          <DatePicker
            enableTabLoop={false}
            selected={new Date(finalDate.getTime() + finalDate.getTimezoneOffset() * 60000)}
            minDate={minDate}
            maxDate={new Date()}
            onChange={(date) => setFinalDate(date as Date)}
            className="form-control"
          />
        </div>
      </div>

      <div className="row">
        <InvoicesByDate initialDate={initialDate} finalDate={finalDate} />
      </div>
    </div>
  );
};
