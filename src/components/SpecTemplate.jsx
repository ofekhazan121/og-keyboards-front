import React from "react";
import '../styles/productPage.scss'

function SpecTemplate({ product, spec }) {
  switch (product.type) {
    case "Keyboard":
      return (
        <div>
          <div className="spec-template">
            <h3>Layout: {spec.spec1}</h3>
            <h3>Body Material: {spec.spec2}</h3>
            <h3>Plate Material: {spec.spec3}</h3>
            <h3>Backlight: {spec.spec4}</h3>
            <h3>Stabilizers: {spec.spec5}</h3>
            <h3>Switch Support: {spec.spec6}</h3>
            <h3>Connectivity: {spec.spec7}</h3> 
          </div>
        </div>
      );
      break;

    case "Switch":
      return (
        <div>
          <div className="spec-template">
            <h3>Stem Material: {spec.spec1}</h3>
            <h3>Housing Material: {spec.spec2}</h3>
            <h3>Manufacturer: {spec.spec3}</h3>
            <h3>Pins: {spec.spec4}</h3>
            <h3>Type: {spec.spec5}</h3>
            <h3>Travel: {spec.spec6}</h3>
            <h3>Spring: {spec.spec7}</h3>
          </div>
        </div>
      );
      break;

    case "Keycaps":
      return (
        <div>
          <div className="spec-template">
            <h3>Profile: {spec.spec1}</h3>
            <h3>Material: {spec.spec2}</h3>
            <h3>Legends: {spec.spec3}</h3>
            <h3>Number of Keys: {spec.spec4}</h3>
            <h3>Compatibility: {spec.spec5}</h3>
          </div>
        </div>
      );
      break;

    case "Case":
      return (
        <div>
          <div className="spec-template">
            <h3>Case Material: {spec.spec1}</h3>
            <h3>Size: {spec.spec2}</h3>
            <h3>Compatibility: {spec.spec3}</h3>
          </div>
        </div>
      );
      break;

    case "Accessories":
      return "";

    default:
      break;
  }
}

export default SpecTemplate;
