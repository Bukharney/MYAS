export type Assignment = {
  ClassName?: string;
  Name: string;
  Submission: string;
  DueDate: string;
};

export type ClassData = {
  ClassName: string;
  Assignments: Assignment[];
};

export const data: ClassData[] = [
  {
    ClassName: "CPE 301 : PROFESSIONAL ISSUES IN COMPUTER ENGINEERING",
    Assignments: [
      {
        Name: "Quiz L2: Organizational Structure and Company Type",
        Submission: "Submitted",
        DueDate: "February 8, 2024 at 01:00",
      },
      {
        Name: "Quiz L3: Career Path and Professional Development",
        Submission: "Submitted",
        DueDate: "February 15, 2024 at 23:55",
      },
      {
        Name: "Quiz L4: Employer Expectation",
        Submission: "Submitted",
        DueDate: "February 22, 2024 at 23:55",
      },
      {
        Name: "Work L5: Business Ethics",
        Submission: "Submitted",
        DueDate: "March 7, 2024 at 23:55",
      },
      {
        Name: "Work L6: SDGs/ESG",
        Submission: "Late Submitted",
        DueDate: "March 14, 2024 at 23:55",
      },
      {
        Name: "Quiz L7: Contracts",
        Submission: "Submitted",
        DueDate: "April 10, 2024 at 23:55",
      },
      {
        Name: "Quiz L8: Computer Laws",
        Submission: "Submitted",
        DueDate: "April 10, 2024 at 23:55",
      },
      {
        Name: "Work L9: Social and environmental impacts of technology",
        Submission: "Late Submitted",
        DueDate: "May 2, 2024 at 23:55",
      },
    ],
  },
  {
    ClassName: "CPE 313 : SIGNALS AND LINEAR SYSTEMS",
    Assignments: [
      {
        Name: "Worksheet1 What is signal and system?",
        Submission: "Submitted",
        DueDate: "January 19, 2024 at 13:00",
      },
      {
        Name: "Worksheet2 Basic operation of system.",
        Submission: "Submitted",
        DueDate: "January 22, 2024 at 13:00",
      },
      {
        Name: "Worksheet3 System property",
        Submission: "Submitted",
        DueDate: "January 27, 2024 at 12:00",
      },
      {
        Name: "Worksheet4",
        Submission: "Submitted",
        DueDate: "February 10, 2024 at 00:00",
      },
      {
        Name: "Worksheet5",
        Submission: "Submitted",
        DueDate: "February 10, 2024 at 00:00",
      },
      {
        Name: "Lab 1 Signal in time domain",
        Submission: "Submitted",
        DueDate: "February 19, 2024 at 12:00",
      },
      {
        Name: "Worksheet6",
        Submission: "Submitted",
        DueDate: "March 8, 2024 at 14:00",
      },
      {
        Name: "Worksheet7",
        Submission: "Late Submitted",
        DueDate: "March 8, 2024 at 14:00",
      },
      {
        Name: "Module 1 score",
        Submission: "Not Submitted",
        DueDate: "No Due Date",
      },
      {
        Name: "Worksheet 8 FT",
        Submission: "Late Submitted",
        DueDate: "March 15, 2024 at 14:03",
      },
      {
        Name: "Inclass exercise Frequency Response",
        Submission: "Submitted",
        DueDate: "April 3, 2024 at 18:00",
      },
      {
        Name: "Lab 2 Filtering image",
        Submission: "Submitted",
        DueDate: "April 8, 2024 at 18:00",
      },
      {
        Name: "Worksheet9",
        Submission: "Submitted",
        DueDate: "April 3, 2024 at 18:00",
      },
      {
        Name: "Module2_3",
        Submission: "Submitted",
        DueDate: "April 19, 2024 at 15:00",
      },
      {
        Name: "Worksheet 10",
        Submission: "Submitted",
        DueDate: "April 19, 2024 at 18:00",
      },
      {
        Name: "Modeule 2 score",
        Submission: "Not Submitted",
        DueDate: "No Due Date",
      },
      {
        Name: "Worksheet11",
        Submission: "Submitted",
        DueDate: "April 26, 2024 at 15:00",
      },
      {
        Name: "Module 3 score",
        Submission: "Not Submitted",
        DueDate: "No Due Date",
      },
    ],
  },
  {
    ClassName: "CPE 314 : COMPUTER NETWORKS",
    Assignments: [
      {
        Name: "Lab 01: Wireshark basics",
        Submission: "Submitted",
        DueDate: "January 22, 2024 at 23:59",
      },
      {
        Name: "Lab 02: Socket programming",
        Submission: "Submitted",
        DueDate: "January 29, 2024 at 23:59",
      },
      {
        Name: "Lab 03: DNS",
        Submission: "Submitted",
        DueDate: "February 5, 2024 at 23:59",
      },
      {
        Name: "Lab 04: UDP and TCP",
        Submission: "Submitted",
        DueDate: "February 12, 2024 at 23:59",
      },
      {
        Name: "Lab 05: Network performance measurement",
        Submission: "Submitted",
        DueDate: "February 19, 2024 at 23:59",
      },
      {
        Name: "Lab 06: IP forwarding and static routing",
        Submission: "Submitted",
        DueDate: "February 26, 2024 at 23:59",
      },
      {
        Name: "Lab 07: DHCP",
        Submission: "Submitted",
        DueDate: "March 4, 2024 at 23:59",
      },
      {
        Name: "Lab 08: ACL and NAT",
        Submission: "Submitted",
        DueDate: "March 11, 2024 at 23:59",
      },
      {
        Name: "Lab 09: SOHO network",
        Submission: "Submitted",
        DueDate: "March 18, 2024 at 23:59",
      },
      {
        Name: "Lab 10: OSPF",
        Submission: "Submitted",
        DueDate: "March 25, 2024 at 23:59",
      },
      {
        Name: "Class Discussion 1",
        Submission: "Submitted",
        DueDate: "March 9, 2024 at 23:59",
      },
      {
        Name: "Class Discussion 2",
        Submission: "Submitted",
        DueDate: "March 16, 2024 at 23:59",
      },
      {
        Name: "Class Discussion 3",
        Submission: "Submitted",
        DueDate: "March 23, 2024 at 23:59",
      },
      {
        Name: "Exam I",
        Submission: "Not Submitted",
        DueDate: "March 29, 2024 at 12:00",
      },
      {
        Name: "Lab 11: SNMP",
        Submission: "Submitted",
        DueDate: "April 22, 2024 at 23:59",
      },
      {
        Name: "Class Discussion 4",
        Submission: "Late Submitted",
        DueDate: "April 20, 2024 at 23:59",
      },
      {
        Name: "Class Discussion 5",
        Submission: "Late Submitted",
        DueDate: "April 27, 2024 at 23:59",
      },
      {
        Name: "Lab 12 VLAN",
        Submission: "Submitted",
        DueDate: "April 29, 2024 at 23:59",
      },
      {
        Name: "Lab 13: STP",
        Submission: "Submitted",
        DueDate: "May 6, 2024 at 23:59",
      },
      {
        Name: "Class Discussion 6",
        Submission: "Late Submitted",
        DueDate: "May 4, 2024 at 23:59",
      },
      {
        Name: "Class Discussion 7",
        Submission: "Late Submitted",
        DueDate: "May 11, 2024 at 23:59",
      },
    ],
  },
  {
    ClassName: "CPE 324 : EMBEDDED SYSTEMS",
    Assignments: [
      {
        Name: "Assignment1_Play_with_TinkerCAD",
        Submission: "Submitted",
        DueDate: "January 21, 2024 at 23:59",
      },
      {
        Name: "Challenge Activity1_32bit_Floating_Point_Multiplier_Circuit_with_TinkerCAD",
        Submission: "Not Submitted",
        DueDate: "January 30, 2024 at 23:59",
      },
      {
        Name: "Assignment2_AVR_I/O",
        Submission: "Submitted",
        DueDate: "January 28, 2024 at 23:59",
      },
      {
        Name: "Assigment3_LCD Programming_ ADC_programming",
        Submission: "Submitted",
        DueDate: "February 4, 2024 at 23:59",
      },
      {
        Name: "Assignment4_AVR_USART_Programming",
        Submission: "Submitted",
        DueDate: "February 11, 2024 at 23:59",
      },
      {
        Name: "Quiz1",
        Submission: "Not Submitted",
        DueDate: "February 14, 2024 at 23:59",
      },
      {
        Name: "Assignment5_Matrix_Keypad_Outdoor_lighting_circuit",
        Submission: "Late Submitted",
        DueDate: "February 18, 2024 at 23:59",
      },
      {
        Name: "Quiz2",
        Submission: "Not Submitted",
        DueDate: "February 22, 2024 at 23:59",
      },
      {
        Name: "PracticeExam1",
        Submission: "Submitted",
        DueDate: "February 21, 2024 at 23:59",
      },
      {
        Name: "Assignment6_HW InstallationLED Blink test",
        Submission: "Submitted",
        DueDate: "March 12, 2024 at 23:59",
      },
      {
        Name: "Assignment7_Pushbutton_to_interupt_blinking_LED",
        Submission: "Not Submitted",
        DueDate: "March 30, 2024 at 23:59",
      },
      {
        Name: "Assignment7_Pushbutton_to_interupt_blinking_LED",
        Submission: "Submitted",
        DueDate: "March 17, 2024 at 23:59",
      },
      {
        Name: "Assignment8_Timer1_Normal_CTC",
        Submission: "Submitted",
        DueDate: "March 26, 2024 at 23:59",
      },
      {
        Name: "Quiz3",
        Submission: "Not Submitted",
        DueDate: "March 29, 2024 at 23:59",
      },
      {
        Name: "Assignment9_Dimmer_Ultrasonic",
        Submission: "Late Submitted",
        DueDate: "April 30, 2024 at 23:59",
      },
      {
        Name: "Assignment10_SPI_12bitA2D_I2C_REALTIMETIMER",
        Submission: "Late Submitted",
        DueDate: "May 19, 2024 at 23:59",
      },
      {
        Name: "Quiz4",
        Submission: "Not Submitted",
        DueDate: "May 10, 2024 at 23:59",
      },
      {
        Name: "Quiz5",
        Submission: "Not Submitted",
        DueDate: "May 10, 2024 at 23:59",
      },
      {
        Name: "MiniProject",
        Submission: "Late Submitted",
        DueDate: "May 24, 2024 at 23:59",
      },
    ],
  },
  {
    ClassName: "CPE351&372 : HIGH PERFORMANCE COMPUTING AND CLOUD TECHNOLOGIES",
    Assignments: [
      {
        Name: "Facebook group",
        Submission: "Not Submitted",
        DueDate: "No Due Date",
      },
      {
        Name: "LAB lecture 2",
        Submission: "Submitted",
        DueDate: "January 30, 2024 at 13:29",
      },
      {
        Name: "msmpi setup",
        Submission: "Not Submitted",
        DueDate: "No Due Date",
      },
      {
        Name: "LAB lecture 3",
        Submission: "Submitted",
        DueDate: "February 6, 2024 at 13:29",
      },
      {
        Name: "LAB lecture 6",
        Submission: "Submitted",
        DueDate: "February 27, 2024 at 13:29",
      },
      {
        Name: "mini project",
        Submission: "Submitted",
        DueDate: "March 4, 2024 at 23:00",
      },
      {
        Name: "midterm exam",
        Submission: "Submitted",
        DueDate: "February 28, 2024 at 23:50",
      },
      {
        Name: "LAB Lecture 7",
        Submission: "Late Submitted",
        DueDate: "March 11, 2024 at 23:55",
      },
      {
        Name: "LAB Lecture 8",
        Submission: "Late Submitted",
        DueDate: "March 18, 2024 at 23:59",
      },
      {
        Name: "LAB lecture 10",
        Submission: "Submitted",
        DueDate: "April 1, 2024 at 23:59",
      },
      {
        Name: "(ไม่ต้องส่งอันนี้นะครับ)",
        Submission: "Not Submitted",
        DueDate: "May 21, 2024 at 23:59",
      },
      {
        Name: "Final presentation",
        Submission: "Submitted",
        DueDate: "May 21, 2024 at 23:59",
      },
    ],
  },
  {
    ClassName: "CPE355&393 : QUANTUM PROGRAMMING AND COMPUTING",
    Assignments: [
      {
        Name: "Facebook group",
        Submission: "Not Submitted",
        DueDate: "No Due Date",
      },
      {
        Name: "Homework 1",
        Submission: "Submitted",
        DueDate: "January 24, 2024 at 23:59",
      },
      {
        Name: "ลิงค์วิดีโอการสอนกับ lecture note",
        Submission: "Not Submitted",
        DueDate: "No Due Date",
      },
      {
        Name: "Homework 2 (from Lecture 3)",
        Submission: "Submitted",
        DueDate: "February 22, 2024 at 23:59",
      },
      {
        Name: "Homework 3 (from Lecture 3)",
        Submission: "Submitted",
        DueDate: "February 22, 2024 at 23:59",
      },
      {
        Name: "Homework lecture 4",
        Submission: "Late Submitted",
        DueDate: "February 14, 2024 at 23:00",
      },
      {
        Name: "Homework lecture 5",
        Submission: "Late Submitted",
        DueDate: "February 28, 2024 at 23:00",
      },
      {
        Name: "Homework lecture 6",
        Submission: "Submitted",
        DueDate: "March 13, 2024 at 23:50",
      },
      {
        Name: "Midterm exam",
        Submission: "Submitted",
        DueDate: "March 3, 2024 at 23:50",
      },
      {
        Name: "Exercise solutions",
        Submission: "Not Submitted",
        DueDate: "No Due Date",
      },
      {
        Name: "Homework lecture 7",
        Submission: "Late Submitted",
        DueDate: "March 13, 2024 at 23:59",
      },
      {
        Name: "Homework lecture 8",
        Submission: "Submitted",
        DueDate: "March 20, 2024 at 23:59",
      },
      {
        Name: "In-class Lecture 9 classical gate",
        Submission: "Late Submitted",
        DueDate: "March 21, 2024 at 14:30",
      },
      {
        Name: "Homework lecture 9 ",
        Submission: "Late Submitted",
        DueDate: "March 28, 2024 at 13:29",
      },
      {
        Name: "Homework lecture 10",
        Submission: "Late Submitted",
        DueDate: "April 11, 2024 at 13:29",
      },
      {
        Name: "mini project",
        Submission: "Submitted",
        DueDate: "May 24, 2024 at 23:59",
      },
      {
        Name: "Final Exam -Take home",
        Submission: "Submitted",
        DueDate: "May 19, 2024 at 23:59",
      },
    ],
  },
  {
    ClassName: "GEN 351 : MODERN MANAGEMENT AND LEADERSHIP",
    Assignments: [
      {
        Name: "ใบงาน Leader as a Role Model",
        Submission: "Submitted",
        DueDate: "February 7, 2024 at 23:59",
      },
      {
        Name: "ส่งใบงาน Self-Management",
        Submission: "Submitted",
        DueDate: "February 16, 2024 at 23:59",
      },
      {
        Name: "ใบงานเกมเศรษฐี",
        Submission: "Submitted",
        DueDate: "No Due Date",
      },
      {
        Name: "ใบงาน Goal Setting week5",
        Submission: "Submitted",
        DueDate: "February 21, 2024 at 23:59",
      },
      {
        Name: "ใบงาน Goal Setting Week 6",
        Submission: "Not Submitted",
        DueDate: "March 6, 2024 at 23:59",
      },
      {
        Name: "ใบงาน Goal Setting Week 8",
        Submission: "Not Submitted",
        DueDate: "March 27, 2024 at 23:59",
      },
      {
        Name: "การบ้าน Decision Making",
        Submission: "Submitted",
        DueDate: "March 27, 2024 at 23:59",
      },
      {
        Name: "ใบงาน Goal Setting Week 10",
        Submission: "Not Submitted",
        DueDate: "April 24, 2024 at 23:59",
      },
      {
        Name: "Decistion Making -งานเดี่ยวโจทย์สำรอง",
        Submission: "Not Submitted",
        DueDate: "March 29, 2024 at 23:59",
      },
      {
        Name: "ใบงาน Goal Setting Week 12  ",
        Submission: "Not Submitted",
        DueDate: "May 8, 2024 at 23:59",
      },
    ],
  },
];
