import React from "react";
import numberWithCommas from "../../../services/numberWithCommas";

const TableTotalRowCell = ({cellData, isComparisons, isActive, isYoY}) => {

  const { current, previous, change, charge, yoy, yoyCharge } = cellData;
  
  return (
    <>
    {isComparisons && isActive ? (
        <>
        <td align="right">
            { current ? "$" + numberWithCommas(current) : "N/A" }
        </td>

        <td align="right">
            { previous ? "$" + numberWithCommas(previous) : "N/A" }
        </td>

        <td align="right">
            {change ? "$" + numberWithCommas(change) : "N/A"}
        </td>

        <td align="right">
            { charge ? numberWithCommas(charge) + "%" : "N/A"}
        </td>

        {isYoY && (
            <>
            <td align="right">
                { yoy ? "$" + numberWithCommas(yoy) : "N/A"}
            </td>
            <td align="right">
                {yoyCharge ? numberWithCommas(yoyCharge) + "%" : "N/A" }
            </td>
            </>
        )}

    </>
    ) : (
        <td align="right">
            { current ? "$" + numberWithCommas(current) : "N/A" }
        </td>
        )}
    </>
  );

}

export default TableTotalRowCell;