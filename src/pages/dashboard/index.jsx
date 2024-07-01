import React from "react";
import { Button, Header, Icon, Segment, Image, Grid } from "semantic-ui-react";
import $ from "jquery";
import AnimIcon from "../../utils/inviteIcon";
import GameInbox from "./GameInbox";
import RewardStat from "./banners";
import SiteStat from "./sitestats";
function SegmentExamplePlaceholderInline(prop) {
  const siteInfo = prop?.siteInfo;
  return (
    <>
      <div className="container-md">
        <div className="text-center">
          <Header icon>
            <Icon>
              <Image
                src="/assets/images/logo.png"
                centered
                alt="گلکسی کازینو"
                style={{
                  width: "30vw",
                  maxWidth: "200px",
                  marginTop: 80,

                  filter:
                    " drop-shadow(1px 1px 30px #ffffff) drop-shadow(1px 1px 2px rgb(0 0 0 / 1)) drop-shadow(1px 1px 3px rgb(0 0 0 / 1)) drop-shadow(1px 1px 10px rgb(0 0 0 / 6))",
                }}
              />
            </Icon>
          </Header>
        </div>
      </div>
      <RewardStat {...prop} />
    </>
  );
}

export default SegmentExamplePlaceholderInline;
