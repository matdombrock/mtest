import React from "react";
import numberWithCommas from "../../../services/numberWithCommas";

const TableTotalRowCell = ({
  cellData,
  isComparisons,
  isActive,
  isYoY,
  symbol = "",
}) => {
  const { current, previous, change, charge, yoy, yoyCharge } = cellData;
  const symbolIsRight = symbol === "%";

  return (
    <>
      {isComparisons && isActive ? (
        <>
          <td align="right">
            {current
              ? `${!symbolIsRight ? symbol : ""}${numberWithCommas(current)}${
                  symbolIsRight ? symbol : ""
                }`
              : "N/A"}
          </td>

          <td align="right">
            {previous
              ? `${!symbolIsRight ? symbol : ""}${numberWithCommas(previous)}${
                  symbolIsRight ? symbol : ""
                }`
              : ""}
          </td>

          <td align="right">
            {change
              ? `${!symbolIsRight ? symbol : ""}${numberWithCommas(change)}`
              : ""}
          </td>

          <td align="right">{charge ? numberWithCommas(charge) + "%" : ""}</td>

          {isYoY && (
            <>
              <td align="right">
                {yoy
                  ? `${!symbolIsRight ? symbol : ""}${numberWithCommas(yoy)}`
                  : "N/A"}
              </td>
              <td align="right">
                {yoyCharge ? numberWithCommas(yoyCharge) + "%" : "N/A"}
              </td>
            </>
          )}
        </>
      ) : (
        <td align="right">
          {current
            ? `${!symbolIsRight ? symbol : ""}${numberWithCommas(current)}${
                symbolIsRight ? symbol : ""
              }`
            : "N/A"}
        </td>
      )}
    </>
  );
};

export default TableTotalRowCell;
