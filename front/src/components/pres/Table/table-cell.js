import React from "react";
import numberWithCommas from "../../../services/numberWithCommas";
import s from "./../DataDisplayItemizedTable/style.module.scss";

const TableCell = ({current, previous, change, charge, yoy, yoyCharge, isComparisons, isActive, isYoY}) => {
  
  const isNegative = (value) =>
    Number(value) !== 0 && (Number(value) <= 0 ? s.red : s.green);

  return (
    <>
    {isComparisons && isActive ? (
        <>
        <td align="right">
            {current !== 0
            ? "$" + numberWithCommas(current)
            : "N/A"}
        </td>
        <td align="right">
            {previous !== 0
            ? "$" + numberWithCommas(previous)
            : "N/A"}
        </td>
        <td
            align="right"
            className={isNegative(change)}
        >
            {change !== 0 ? "$" + change : "N/A"}
        </td>
        <td
            align="right"
            className={isNegative(charge)}
        >
            {charge !== 0 ? charge + "%" : "N/A"}
        </td>
        {isYoY && (
            <>
            <td
                align="right"
                className={isNegative(yoy)}
            >
                {yoy !== 0
                ? numberWithCommas(yoy)
                : "N/A"}
            </td>
            <td
                align="right"
                className={isNegative(yoyCharge)}
            >
                {yoyCharge !== 0
                ? yoyCharge + "%"
                : "N/A"}
            </td>
            </>
        )}
        </>
    ) : (
        <td align="right">
            {current !== 0
            ? "$" + numberWithCommas(current)
            : "N/A"}
        </td>
        )}
    </>
  );

}

export default TableCell;