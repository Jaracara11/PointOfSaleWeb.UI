import './sales.css';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export const Sales = () => {
  const [initialDate, setInitialDate] = useState<Date | null>(null);
  const [finalDate, setFinalDate] = useState<Date | null>(null);

  return (
    <div className="sales">
      <div className="row">
        <h1 className="title">Sales</h1>
      </div>
      <div className="row">
        <div className="date-pickers">
          <div>
            <span className="text-muted">Order Date Between: </span>

            <DatePicker
              enableTabLoop={false}
              selected={initialDate}
              onChange={(date) => setInitialDate(date as Date)}
              className="form-control"
            />

            <DatePicker
              enableTabLoop={false}
              selected={finalDate}
              onChange={(date) => setFinalDate(date as Date)}
              className="form-control"
            />
          </div>

          <div>
            <Button variant="dark">Search</Button>
          </div>
        </div>
      </div>
      <div className="row">
        <Table hover>
          <thead>
            <tr>
              <th>Invoice ID</th>
            </tr>
          </thead>
        </Table>
      </div>
    </div>
  );
};
