import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

export default function SimpleDialog({
  isOpen,
  setIsOpen,
  title,
  content,
  buttonText,
  buttonAction,
  buttonStatus,
}) {
  const cancelButtonRef = useRef();

  function closeModal() {
    setIsOpen(false);
    if (buttonAction) {
      buttonAction();
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-20 overflow-y-auto"
        onClose={closeModal}
        initialFocus={cancelButtonRef}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {title}
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{content}</p>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  ref={cancelButtonRef}
                  type="button"
                  className={`inline-flex justify-center px-4 py-2 text-sm font-medium 
                  ${
                    buttonStatus === "success"
                      ? "text-blue-900 bg-blue-100 hover:bg-blue-200 focus-visible:ring-blue-500"
                      : "text-red-900 bg-red-100 hover:bg-red-200 focus-visible:ring-red-500"
                  } border border-transparent rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 `}
                  onClick={closeModal}
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
