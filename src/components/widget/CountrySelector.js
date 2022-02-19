import React, { Component } from "react";
import Select, { components } from "react-select";
import countryList from "react-select-country-list";
import "./CountrySelector.css";

function CountryFlag(props) {
  return (
    <span
      className={"flag-icon flag-icon-" + props.code}
      //   style={{ fontSize: props.size || "60px" }}
    />
  );
}

export const CountryFlagSelectOption = (props) => {
  return (
    <components.Option {...props}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <CountryFlag size={props.flagSize} code={props.value.toLowerCase()} />
        {props.label}
      </div>
    </components.Option>
  );
};

export const CountryFlagValueContainer = ({ children, ...props }) => {
  const code = (props.hasValue && props.getValue()[0].value) || false;

  return (
    <div style={{ display: "flex", flexGrow: 1 }}>
      {(code && <CountryFlag code={code.toLowerCase()} />) || null}
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    </div>
  );
};

const styles = {
  valueContainer: (base, state) => {
    const height = "2rem";
    return { ...base, height };
  },
};

export default class CountrySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: countryList().getData(),
      value: null,
    };
  }

  changeHandler = (value) => {
    this.setState({ value });
  };

  render() {
    return (
      <Select
        styles={styles}
        options={this.state.options}
        className="text-black"
        value={this.state.value}
        onChange={this.changeHandler}
        components={{
          Option: CountryFlagSelectOption,
          ValueContainer: CountryFlagValueContainer,
        }}
      />
    );
  }
}
export { CountrySelector };