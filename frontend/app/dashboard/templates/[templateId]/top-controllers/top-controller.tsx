"use client";
import { DevicesProvider, WithEditor } from "@grapesjs/react";
import { RightButtons } from "./right-buttons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaDesktop, FaMobileAlt } from "react-icons/fa";
import { FaTabletScreenButton } from "react-icons/fa6";
import { BiMobileLandscape } from "react-icons/bi";
import { Button } from "@/components/ui/button";

const TopControllers = ({ templateId }: { templateId: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDevice = (selected: string | number, select: any) => {
    select(selected);
  };

  return (
    <div className="border-b bg-muted text-black flex items-center justify-between">
      <div className="px-2">
        <DevicesProvider>
          {({ devices, select, selected }) => {
            const iconInactive = `text-lg text-slate-500`;
            const iconActive = `text-lg text-slate-900`;

            return (
              <div>
                <TooltipProvider>
                  {devices.length > 0 && (
                    <Tooltip>
                      <TooltipContent>
                        <p>Desktop - {devices[0]?.getWidthMedia()}</p>
                      </TooltipContent>
                      <TooltipTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className={`my-1 px-2 h-8 ${
                            selected == "desktop" && "bg-white"
                          }`}
                          onClick={() => handleDevice(devices[0]?.id, select)}
                        >
                          <FaDesktop
                            className={
                              selected == "desktop" ? iconActive : iconInactive
                            }
                          />
                        </Button>
                      </TooltipTrigger>
                    </Tooltip>
                  )}
                  {devices.length > 1 && (
                    <Tooltip>
                      <TooltipContent>
                        <p>Tablet - {devices[1]?.getWidthMedia()}</p>
                      </TooltipContent>
                      <TooltipTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className={`my-1 px-2 h-8 ${
                            selected == "tablet" && "bg-white"
                          }`}
                          onClick={() => handleDevice(devices[1]?.id, select)}
                        >
                          <FaTabletScreenButton
                            className={
                              selected == "tablet" ? iconActive : iconInactive
                            }
                          />
                        </Button>
                      </TooltipTrigger>
                    </Tooltip>
                  )}
                  {devices.length > 2 && (
                    <Tooltip>
                      <TooltipContent>
                        <p>Mobile Landscape - {devices[2]?.getWidthMedia()}</p>
                      </TooltipContent>
                      <TooltipTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className={`my-1 px-2 h-8 ${
                            selected == "mobileLandscape" && "bg-white"
                          }`}
                          onClick={() => handleDevice(devices[2]?.id, select)}
                        >
                          <FaMobileAlt
                            className={
                              selected == "mobileLandscape"
                                ? iconActive
                                : iconInactive
                            }
                          />
                        </Button>
                      </TooltipTrigger>
                    </Tooltip>
                  )}
                  {devices.length > 3 && (
                    <Tooltip>
                      <TooltipContent>
                        <p>Mobile Portrait - {devices[3]?.getWidthMedia()}</p>
                      </TooltipContent>
                      <TooltipTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className={`my-1 px-2 h-8 ${
                            selected == "mobilePortrait" && "bg-white"
                          }`}
                          onClick={() => handleDevice(devices[3]?.id, select)}
                        >
                          <BiMobileLandscape
                            className={
                              selected == "mobilePortrait"
                                ? iconActive
                                : iconInactive
                            }
                          />
                        </Button>
                      </TooltipTrigger>
                    </Tooltip>
                  )}
                </TooltipProvider>
              </div>
            );
          }}
        </DevicesProvider>
      </div>
      <p>Template: {templateId}</p>
      <WithEditor>
        <RightButtons />
      </WithEditor>
    </div>
  );
};

export default TopControllers;
