import React from "react";
import numberWithCommas from "../../../services/numberWithCommas";
import s from "./../DataDisplayItemizedTable/style.module.scss";

const TableCell = ({
  current,
  previous,
  change,
  charge,
  yoy,
  yoyCharge,
  isComparisons,
  isActive,
  isYoY,
  symbol = "",
}) => {
  const isNegative = (value) =>
    Number(value) !== 0 && (Number(value) <= 0 ? s.red : s.green);

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
              : "N/A"}
          </td>
          <td align="right" className={isNegative(change)}>
            {change
              ? `${!symbolIsRight ? symbol : ""}${numberWithCommas(change)}`
              : "N/A"}
          </td>
          <td align="right" className={isNegative(charge)}>
            {charge  ? charge + "%" : "N/A"}
          </td>
          {isYoY && (
            <>
              <td align="right" className={isNegative(yoy)}>
                {yoy
                  ? `${!symbolIsRight ? symbol : ""}${numberWithCommas(yoy)}`
                  : "N/A"}
              </td>
              <td align="right" className={isNegative(yoyCharge)}>
                {(yoyCharge) ? yoyCharge + "%" : "N/A"}
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

export default TableCell;
