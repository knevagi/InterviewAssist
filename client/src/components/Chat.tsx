import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { BsChevronDown, BsPlusLg } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";

import Message from "./Message";

const Chat = (props: any) => {
  const { toggleComponentVisibility } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showEmptyChat, setShowEmptyChat] = useState(true);
  const [conversation, setConversation] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const bottomOfChatRef = useRef<HTMLDivElement>(null);
  const DEFAULT_OPENAI_MODEL = {
    name: "Default (GPT-3.5)",
    id: "gpt-3.5-turbo",
    available: true,
  };
  const selectedModel = DEFAULT_OPENAI_MODEL;

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "24px";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [message, textAreaRef]);

  useEffect(() => {
    if (bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const sendMessage = async (e: any) => {
    e.preventDefault();

    // Don't send empty messages
    if (message.length < 1) {
      setErrorMessage("Please enter a message.");
      return;
    } else {
      setErrorMessage("");
    }

    
    setIsLoading(true);

    // Add the message to the conversation
    setConversation([
      ...conversation,
      { content: message, role: "user" },
      { content: null, role: "system" },
    ]);

    // Clear the message & remove empty chat
    setMessage("");
    setShowEmptyChat(false);

    try {
      var bodyparam = JSON.stringify({
        messages: [
          ...conversation.map(msg => ({ role: msg.role, content: msg.content })),
          { role: "user", content: message }
        ].filter(msg => msg.content !== null),
        model: selectedModel,
      });
      console.log(bodyparam);
      const response = await fetch(`http://10.157.61.124:8000/send_answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:bodyparam ,
      });

      if (response.ok) {
        const data = await response.json();

        // Add the message to the conversation
        setConversation([
          ...conversation,
          { content: message, role: "user" },
          { content: data.message, role: "system" },
        ]);
      } else {
        console.error(response);
        setErrorMessage(response.statusText);
      }

      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message);

      setIsLoading(false);
    }
  };

  const handleKeypress = (e: any) => {
    // It's triggers by pressing the enter key
    if (e.keyCode == 13 && !e.shiftKey) {
      sendMessage(e);
      e.preventDefault();
    }
  };

  return (
                <div className="flex max-w-full flex-1 flex-col">
                <div className="sticky top-0 z-10 flex items-center border-b border-blue-100 bg-blue-50 pl-1 pt-1 text-blue-900 sm:pl-3 md:hidden">
                  <button
                    type="button"
                    className="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white"
                    onClick={toggleComponentVisibility}
                  >
                    <span className="sr-only">Open sidebar</span>
                    <RxHamburgerMenu className="h-6 w-6 text-white" />
                  </button>
                  <h1 className="flex-1 text-center text-base font-normal">New chat</h1>
                  <button type="button" className="px-3">
                    <BsPlusLg className="h-6 w-6" />
                  </button>
                </div>
                <div className="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
                  <div className="flex-1 overflow-hidden">
                    <div className="react-scroll-to-bottom--css-ikyem-79elbk h-full bg-white">
                      <div className="react-scroll-to-bottom--css-ikyem-1n7m0yu">
                        {!showEmptyChat && conversation.length > 0 ? (
                          <div className="flex flex-col items-center text-sm bg-gray-800">
                            <div className="flex w-full items-center justify-center gap-1 border-b border-blue-100 bg-blue-50 p-3 text-blue-700">
                              Model: {selectedModel.name}
                            </div>
                            {conversation.map((message, index) => (
                              <Message key={index} message={message} />
                            ))}
                            <div className="w-full h-32 md:h-48 flex-shrink-0 bg-white"></div>
                            <div ref={bottomOfChatRef}></div>
                          </div>
                        ) : null}
                        {showEmptyChat ? (
                          <div className="py-10 relative w-full flex flex-col h-full">
                            <div className="flex items-center justify-center gap-2">
                              <div className="relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                                <button
                                  className="relative flex w-full cursor-default flex-col rounded-md border border-blue-200 bg-white py-2 pl-3 pr-10 text-left focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                  id="headlessui-listbox-button-:r0:"
                                  type="button"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  data-headlessui-state=""
                                  aria-labelledby="headlessui-listbox-label-:r1: headlessui-listbox-button-:r0:"
                                >
                                  <label
                                    className="block text-xs text-blue-600 text-center"
                                    id="headlessui-listbox-label-:r1:"
                                    data-headlessui-state=""
                                  > 
                                    Model
                                  </label>
                                  <span className="inline-flex w-full truncate">
                                    <span className="flex h-6 items-center gap-1 truncate text-blue-900">
                                      {selectedModel.name}
                                    </span>
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <BsChevronDown className="h-4 w-4 text-gray-400" />
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        <div className="flex flex-col items-center text-sm dark:bg-gray-800"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full border-t border-blue-100 bg-white pt-2">
                    <form className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
                      <div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
                        {errorMessage ? (
                          <div className="mb-2 md:mb-0">
                            <div className="h-full flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
                              <span className="text-red-500 text-sm">{errorMessage}</span>
                            </div>
                          </div>
                        ) : null}
                        <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-blue-200 bg-white text-blue-900 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)]">
                          <textarea
                            ref={textAreaRef}
                            value={message}
                            tabIndex={0}
                            data-id="root"
                            style={{
                              height: "24px",
                              maxHeight: "200px",
                              overflowY: "hidden",
                            }}
                            // rows={1}
                            placeholder="Send a message..."
                            className="m-0 w-full resize-none border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 bg-transparent pl-2 md:pl-0 text-blue-900 placeholder-blue-400"
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeypress}
                          ></textarea>
                          <button
                            disabled={isLoading || message?.length === 0}
                            onClick={sendMessage}
                            className="absolute p-1 rounded-md bottom-1.5 md:bottom-2.5 bg-transparent disabled:bg-blue-200 right-1 md:right-2 disabled:opacity-40"
                          >
                            <FiSend className="h-4 w-4 mr-1 text-blue-600" />
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
  );
};

export default Chat;
