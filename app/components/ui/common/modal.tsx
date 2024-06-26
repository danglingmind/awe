import { Dispatch, ReactNode, SetStateAction, useState } from "react";

export interface ModalProps {
  children?: ReactNode;
  /**
   * visibility of the modal.
   */
  visible: boolean;
  /**
   * Control the visibility of the modal from inside the modal.
   */
  setVisible?: Dispatch<SetStateAction<boolean>>;
  /**
   * Header of the modal.
   */
  header?: ReactNode;
  /**
   * Enable outside click to cancel the modal.
   */
  outsideClick?: boolean;
  /**
   * Background color
   */
  bg?: string;
}

export default function Modal({
  header,
  children,
  visible,
  setVisible,
  outsideClick,
  bg,
}: ModalProps) {
  const enableOutsideClick =
    outsideClick === undefined || outsideClick === true ? true : false;
  return (
    visible && (
      <div
        id="container"
        onClick={(e) => {
          enableOutsideClick &&
            e.target.id === "container" &&
            setVisible &&
            setVisible(false);
        }}
        // TODO: add animation in the trasition of modal
        className="fixed left-0 top-0 w-full h-full flex flex-col items-center justify-center z-10 backdrop-blur-sm"
      >
        <div className="w-7/12 z-50">
          <div className={`modal-box min-w-full ${bg}`}>
            <div id="header" className="text-lg text-pretty mt-3 mb-3">
              {header}
            </div>
            <div id="content">{children}</div>
          </div>
        </div>
      </div>
    )
  );
}
