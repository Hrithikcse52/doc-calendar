import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export default function ItemModal({ isOpen, onClose, events, index }) {
  return (
    <Modal size={"3xl"} isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Event Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading as="h3" size="lg">
            Patient Details
          </Heading>
          {events && events[index] && (
            <>
              <div>Patient Name: {events[index].patientName}</div>
              <div>Patient Age: {events[index].age}</div>
              <div>Patient Gender: {events[index].gender}</div>
              <div>Patient Problem: {events[index].problemsReported}</div>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Flex
            width={"full"}
            gap={"4"}
            justifyContent="center"
            alignItems={"center"}
          >
            <Button
              colorScheme="whatsapp"
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-brand-whatsapp"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9"></path>
                  <path d="M9 10a0.5 .5 0 0 0 1 0v-1a0.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 .5 0 0 0 0 -1h-1a0.5 .5 0 0 0 0 1"></path>
                </svg>
              }
            >
              Send Reminder
            </Button>
            <Button
              colorScheme="twitter"
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-prescription"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M6 19v-16h4.5a4.5 4.5 0 1 1 0 9h-4.5"></path>
                  <path d="M19 21l-9 -9"></path>
                  <path d="M13 21l6 -6"></path>
                </svg>
              }
            >
              Open Prescription Pad
            </Button>
            <Button
              colorScheme="linkedin"
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-calendar-time"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4"></path>
                  <circle cx="18" cy="18" r="4"></circle>
                  <path d="M15 3v4"></path>
                  <path d="M7 3v4"></path>
                  <path d="M3 11h16"></path>
                  <path d="M18 16.496v1.504l1 1"></path>
                </svg>
              }
            >
              Reschedule
            </Button>
            <Button
              colorScheme="messenger"
              leftIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-message-circle"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1"></path>
                  <line x1="12" y1="12" x2="12" y2="12.01"></line>
                  <line x1="8" y1="12" x2="8" y2="12.01"></line>
                  <line x1="16" y1="12" x2="16" y2="12.01"></line>
                </svg>
              }
            >
              Chat
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
