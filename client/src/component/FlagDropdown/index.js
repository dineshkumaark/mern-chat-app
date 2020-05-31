import React, { useState, useEffect } from "react";
import {
   Dropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem,
} from "reactstrap";

const FlagDropDown = ({ onChange, value }) => {
   const [dropdownOpen, setDropdownOpen] = useState(false);

   const toggle = () => setDropdownOpen((prevState) => !prevState);

   const FlagData = [
      { name: "India Code", flag: "in-flag.png", value: "+91" },
      { name: "US Code", flag: "us-flag.png", value: "+1" },
      { name: "UK Code", flag: "uk-flag.png", value: "+44" },
   ];

   const [currFlagData, setCurrFlagData] = useState(FlagData[0]);
   // const currFlagData = FlagData[0];
   useEffect(() => {
      const filterData =
         FlagData.filter((data) => data.value === value)[0] || currFlagData;

      setCurrFlagData(filterData);
   }, [value]);

   return (
      <Dropdown
         isOpen={dropdownOpen}
         toggle={toggle}
         className="custom-flag-dropdown"
      >
         <DropdownToggle caret tag="span">
            <img
               src={require(`../../assets/images/flags/${currFlagData.flag}`)}
            />
         </DropdownToggle>
         <DropdownMenu className="custom-flag-menu">
            {FlagData.map(({ value, flag, name }) => (
               <DropdownItem
                  onClick={() => {
                     setCurrFlagData({ value, flag, name });
                     onChange &&
                        onChange({ target: { name: "phoneCode", value } });
                  }}
                  className="custom-flag-item"
               >
                  <img
                     src={require(`../../assets/images/flags/${flag}`)}
                     alt={name}
                     title={name}
                  />
               </DropdownItem>
            ))}
         </DropdownMenu>
      </Dropdown>
   );
};

export default FlagDropDown;
