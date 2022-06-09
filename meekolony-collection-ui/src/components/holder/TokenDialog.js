import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";

export default function TokenDialog({ isOpen, setIsOpen, token, buttonText }) {
  const cancelButtonRef = useRef();
  console.log(token);
  function closeModal() {
    setIsOpen(false);
  }

  const attributeBox = ({ trait_type, value }, i) => {
    return (
      <div className="bg-gray-900 rounded p-3" key={i}>
        <div className="italic font-thin text-sm text-gray-400">
          {trait_type}
        </div>
        <p class="text-slate-200 w-full text-sm">{value}</p>
      </div>
    );
  };

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
            <div className="inline-block w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-slate-800 shadow-xl rounded-2xl text-white">
              <div className="mt-2">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3">
                    <img
                      src={token.image}
                      alt="Sunset in the mountains"
                      className="rounded"
                    />
                  </div>
                  <div class="w-full md:w-2/3 px-6 py-4 flex flex-col gap-3">
                    <div class="font-bold text-xl mb-2">{token.name}</div>
                    <div class="font-bold mb-2 text-red-700">
                      {token.symbol}
                    </div>
                    <div>
                      <div className="italic text-gray-400  ">Description</div>
                      <p class="text-slate-200 w-full">{token.description}</p>
                    </div>
                    <div>
                      <div className="italic text-gray-400  ">Attributes</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {token.attributes &&
                          token.attributes.length > 0 &&
                          token.attributes.map((attribute, i) =>
                            attributeBox(attribute, i)
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  ref={cancelButtonRef}
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 hover:bg-blue-200 focus-visible:ring-blue-500 border border-transparent rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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
