import React, { useState } from "react";
import { useEffect } from "react";
import "../index.scss";


function AddSpec({product,spec,setSpec}) {


  switch (product.type) {
    case "Keyboard":
      return (
        <div className="spec-form">
          <input
            type="text"
            required
            name="spec1"
            value={spec.spec1}
            onChange={(e) => setSpec(prevState => ({...prevState, spec1 : e.target.value}))}
            placeholder="Layout"
          ></input>
          <input
            type="text"
            required
            name="spec2"
            value={spec.spec2}
            onChange={(e) => setSpec(prevState => ({...prevState, spec2 : e.target.value}))}
            placeholder="Body Material"
          ></input>
          <input
            type="text"
            required
            name="spec3"
            value={spec.spec3}
            onChange={(e) => setSpec(prevState => ({...prevState, spec3 : e.target.value}))}
            placeholder="Plate Material"
          ></input>
          <input
            type="text"
            required
            name="spec4"
            value={spec.spec4}
            onChange={(e) => setSpec(prevState => ({...prevState, spec4 : e.target.value}))}
            placeholder="Backlight"
          ></input>
          <input
            type="text"
            required
            name="spec5"
            value={spec.spec5}
            onChange={(e) => setSpec(prevState => ({...prevState, spec5 : e.target.value}))}
            placeholder="Stabilizers"
          ></input>
          <input
            type="text"
            required
            name="spec6"
            value={spec.spec6}
            onChange={(e) => setSpec(prevState => ({...prevState, spec6 : e.target.value}))}
            placeholder="Switch Support"
          ></input>
          <input
            type="text"
            required
            name="spec7"
            value={spec.spec7}
            onChange={(e) => setSpec(prevState => ({...prevState, spec7 : e.target.value}))}
            placeholder="Connectivity"
          ></input>
        </div>
      );

    case "Switch":
      return (
        <div className="spec-form">
          <input
            type="text"
            required
            name="spec1"
            value={spec.spec1}
            onChange={(e) => setSpec(prevState => ({...prevState, spec1 : e.target.value}))}
            placeholder="Stem Material"
          ></input>
          <input
            type="text"
            required
            name="spec2"
            value={spec.spec2}
            onChange={(e) => setSpec(prevState => ({...prevState, spec2 : e.target.value}))}
            placeholder="Housing Material"
          ></input>
          <input
            type="text"
            required
            name="spec3"
            value={spec.spec3}
            onChange={(e) => setSpec(prevState => ({...prevState, spec3 : e.target.value}))}
            placeholder="Manufacturer"
          ></input>
          <input
            type="text"
            required
            name="spec4"
            value={spec.spec4}
            onChange={(e) => setSpec(prevState => ({...prevState, spec4 : e.target.value}))}
            placeholder="Pins"
          ></input>
          <input
            type="text"
            required
            name="spec5"
            value={spec.spec5}
            onChange={(e) => setSpec(prevState => ({...prevState, spec5 : e.target.value}))}
            placeholder="Type"
          ></input>
          <input
            type="text"
            required
            name="spec6"
            value={spec.spec6}
            onChange={(e) => setSpec(prevState => ({...prevState, spec6 : e.target.value}))}
            placeholder="Travel"
          ></input>
          <input
            type="text"
            required
            name="spec7"
            value={spec.spec7}
            onChange={(e) => setSpec(prevState => ({...prevState, spec7 : e.target.value}))}
            placeholder="Spring"
          ></input>
        </div>
      );

    case "Keycaps":
      return (
        <div className="spec-form">
          <input
            type="text"
            required
            name="spec1"
            value={spec.spec1}
            onChange={(e) => setSpec(prevState => ({...prevState, spec1 : e.target.value}))}
            placeholder="Profile"
          ></input>
          <input
            type="text"
            required
            name="spec2"
            value={spec.spec2}
            onChange={(e) => setSpec(prevState => ({...prevState, spec2 : e.target.value}))}
            placeholder="Material"
          ></input>
          <input
            type="text"
            required
            name="spec3"
            value={spec.spec3}
            onChange={(e) => setSpec(prevState => ({...prevState, spec3 : e.target.value}))}
            placeholder="Legends"
          ></input>
          <input
            type="text"
            required
            name="spec4"
            value={spec.spec4}
            onChange={(e) => setSpec(prevState => ({...prevState, spec4 : e.target.value}))}
            placeholder="Number Of Keys"
          ></input>
          <input
            type="text"
            required
            name="spec5"
            value={spec.spec5}
            onChange={(e) => setSpec(prevState => ({...prevState, spec5 : e.target.value}))}
            placeholder="Compatibility"
          ></input>
        </div>
      );

    case "Case":
      return (
        <div className="spec-form">
          <input
            type="text"
            required
            name="spec1"
            value={spec.spec1}
            onChange={(e) => setSpec(prevState => ({...prevState, spec1 : e.target.value}))}
            placeholder="Case Material"
          ></input>
          <input
            type="text"
            required
            name="spec2"
            value={spec.spec2}
            onChange={(e) => setSpec(prevState => ({...prevState, spec2 : e.target.value}))}
            placeholder="Size"
          ></input>
          <input
            type="text"
            required
            name="spec3"
            value={spec.spec3}
            onChange={(e) => setSpec(prevState => ({...prevState, spec3 : e.target.value}))}
            placeholder="Compatibility"
          ></input>
        </div>
      );
      case "Accessories" : 
        return (
          "Accessories"
        )

    default:
      return (<h1>Need to Add Type</h1>)
      break;
  }
}

export default AddSpec;
