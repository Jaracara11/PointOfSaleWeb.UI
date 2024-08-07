import { Button } from 'react-bootstrap';
import { downloadExcel } from 'react-export-table-to-excel';

export const ExportDataToExcelBtn = ({ headers, fileName, data }: any) => {
  const handleDownloadExcel = () => {
    downloadExcel({
      fileName: fileName,
      sheet: '',
      tablePayload: {
        header: headers,
        body: data
      }
    });
  };

  return (
    <Button variant="success" disabled={data.length === 0} onClick={handleDownloadExcel}>
      <i className="bi bi-filetype-xls"></i>
      &nbsp; Export To Excel
    </Button>
  );
};
