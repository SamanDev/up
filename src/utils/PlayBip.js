import React from "react";
import useSound from "use-sound";
import { Button } from "semantic-ui-react";

import glugSfx from "./bip.mp3";
function RisingPitch(prop) {
  const [play] = useSound(glugSfx);

  return (
    <Button id="playbip" onClick={play} style={{ display: "none" }}>
      <span role="img" aria-label="Person with lines near mouth">
        🗣
      </span>
    </Button>
  );
}
export default RisingPitch;
