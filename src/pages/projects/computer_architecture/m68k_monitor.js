import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/computer_architecture/m68k_monitor/example.png';
import cmd from '../../../images/computer_architecture/m68k_monitor/cmd.png';
import excep from '../../../images/computer_architecture/m68k_monitor/excep.png';
import imple from '../../../images/computer_architecture/m68k_monitor/imple.png';
import mp_loop from '../../../images/computer_architecture/m68k_monitor/mp_loop.png';

const M68KPage = () => {
  return (
    <ProjectPage image={ example } title="Implementation of a Monitor Program for M68K Instruction Set" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>	The main goal of this project was to create a Monitor Program ("TUTOR 0") using MC68000 assembly language. The designed program provides a command-line interface through which the user can perform a variety of functions capable of searching, displaying, modifying, moving and testing memory locations. For this project, 12 basic debugger commands were also created, which the user can enter at the terminal. Each of these commands are discussed extensively in the project report (available <a href="">here</a>), including their functionality, proper usage and design. The Monitor Program also supports exception handling, and is able to deal with most of the common exceptions that can arise during regular operation. Descriptions of these, along with a discussion on the implementation of their exception-handling routines, are provided in the report as well.
        </p>
      </article>
      <article className="project-article">
        <h1>Overview</h1>
        <p>	The Monitor Program code (in memory) is divided up into four distinct spaces:</p>
        <ol>
          <li>The Monitor Program: This section comprises of code that displays the initial message, terminal prompt, and gets the user input.</li>
          <li>The Command Interpreter: This block of codes contains subroutines that deal with parsing the input string, command interpretation, and acquiring data for the specific commands.</li>
          <li>The Command Space: Here, subroutines that perform the operation for each of the command is stored.</li>
          <li>The Exception Space: All exception handling routines are located here.</li>
        </ol>
        <p>	Each of these spaces are further divided up into "Data Space"&mdash;where all of the memory data (such as prompts, error messages, reserved memory spaces) is stored&mdash;and "Program Space"&mdash;which contain the actual subroutines. Note that these definitions differ from their actual use in microprocessor architecture and are only used to segment the large code of the Monitor Program into manageable segments.</p>
      </article>
      <article className="project-article">
        <h1>Monitor Program</h1>
        <p>This part of the code essentially consists of the read-eval-print loop. At the onset, the terminal prompt "TUTOR 0&#62;" is printed and the program waits for the user to enter something. Once the user hits the Return key, the program reads and parses the input, evaluates the command (or prints an error message if the command is invalid), and outputs the result along with a new terminal prompt ready for the user's next input. Part of the main loop code is shown in the figure below.</p>
        <figure id="mp_loop">
          <img src={mp_loop} alt="Monitor Program Code"/>
          <figcaption>Figure 1: Monitor Program Main Loop</figcaption>
        </figure>
      </article>
      <article className="project-article">
        <h1>Command Interpreter</h1>
        <p>To execute a command, the user must first enter the command at the terminal. Next, the program must to recognize the entered command and branch to appropriate subroutine to perform its required function. The "Command Interpreter" is a special subsection of the program which facilitates this operation. It checks the user input and determines if the entered string is a valid command. If not, an error message is displayed and the program returns to the terminal, ready for the next user input.</p>
        <p>Apart from the command name, the user inputted string may contain additional data that may be used in the operation of the command. These may be addresses, immediate data or strings. Among these, the addresses and immediate may either be hexadecimal (represented by the '$' symbol) or decimal (no '$' symbol). Therefore, the "Command Interpreter" must possess the capability to read and decipher this data, and then provide it to the appropriate subroutines that require them. As far as the scope of this program is concerned, any inputted command must follow the syntax below:</p>
        <p>Syntax: &#60;Space&#62; &#60;Command Name&#62;  &#60;Data&#62; &#60;Mode&#62; &#60;CR&#62;</p>
        <p>Here's an example of a valid and an invalid command run using the Monitor Program:</p>
        <figure id="cmd">
          <img src={cmd} alt="Valid and Invalid Command Example"/>
          <figcaption>Figure 2: Invalid Command (Missing Leading &#60;Space&#62;) Followed by Valid Command</figcaption>
        </figure>
        <p>As seen above, commands are comprised of a "Command Name", with optional "Data" and "Mode" fields (not used in the above example). To manage all these kinds of inputs, the "Command Interpretter" has three separate subroutines, each of which controls a certain type of input:</p>
        <ol>
          <li>"CHK_CMD" (Check Command Name) : This subroutine checks the "Command Name" of the entered command. If it is a valid command, this subroutine calls the appropriate subroutine(s) to perform the required operation. Else, an error message is displayed.</li>
          <li>"GET_DATA" (Get Single Datum) : This subroutine gets a single hexadecimal or decimal datum from the user input string, which can then be used by the subroutines designed to implement the debugger commands. If the data is invalid, an error message is displayed.</li>
          <li>"GET_MODE" (Get Single Datum) : This subroutine determines the mode of operation for certain debugger commands. If the input is invalid, an error message is displayed.</li>
        </ol>
        <p>Additionally, there are a few other auxillary subroutines that assist the operation of the 3 major ones discussed above:</p>
        <ol>
          <li>"CHK_END" (Check End) : This subroutine checks whether the inputted command has been properly ended with a carriage return. If not, an error message is displayed.</li>
          <li>"INVALID" : This subroutine displays the message "INVALID COMMAND!" to the screen.</li>
          <li>"HEX_DEC" (Hex to Decimal) : This subroutine converts a hexadecimal number in D1 to its corresponding decimal value.</li>
        </ol>
      </article>
      <article className="project-article">
        <h1>Command Space</h1>
        <p>The implemented Monitor program contains 12 basic debugger commands that the user can enter at the terminal. These commands can be used to carry out a wide range of operations including searching, displaying, modifying, moving and testing memory locations. Each command has its own subroutine that performs its operation and, based on the "Command Name" inputted, the "Command Interpreter" calls the appropriate subroutine. Also, depending on its operation, different functions require different sets of input data. Following is a list of all existing commands:</p>
        <ol>
          <li>HELP: Display descriptions and usage of all 12 existing commands</li>
          <li>EXIT: Exit from the terminal</li>
          <li>DF: Display the contents of all registers&mdash;PC, SR,US,SS, Data Registers and Address Registers&mdash;at the time this command is executed</li>
          <li>GO: Execute a piece of code stored in memory</li>
          <li>MS (Memory Set): Store data starting at a given address</li>
          <li>BF (Block Fill): Store a word sized data in memory locations within an address range</li>
          <li>BMOV (Block Move): Move data from one block of memory locations to another</li>
          <li>BTEST (Block Test): A destructive test of a block of memory. The memory is tested by consecutively writing and reading different types of data to see whether the written value is actually maintained by the memory locations or not.</li>
          <li>BSCH (Block Search): Search for a literal string in memory</li>
          <li>MDSP (Memory Display): Display data in consecutive memory locations</li>
          <li>MM (Memory Modify): Performs the dual task of displaying as well as allowing the user to modify memory locations</li>
          <li>SORTW (Sort Word): Sort word size data located between two inputted addresses</li>
        </ol>
        <p>Each command implementation is stored at consecutive addresses starting at 0x18FE. Labels are placed at the start of each implementation, allowing us to directly jump to the implementation of a specific command using the command name rather than the exact memory location of the block of code. An example implementation of a command is shown in the figure below.</p>
        <figure id="imple">
          <img src={imple} alt='Code for "GO" Command'/>
          <figcaption>Figure 3: Implementation of the "GO" Command</figcaption>
        </figure>
        <p>For a more detailed discussion on the functionality, required inputs and constraints for each command, refer to the project <a href="">documentation</a>.</p>
      </article>
      <article className="project-article">
        <h1>Exception Space</h1>
        <p>During the normal operation of executing one of the existing commands, exceptions could be raised due to invalid inputs or due to executing erroneous code from a memory location using the "GO" command. At such times, rather than being rendered inoperable, the Monitor Program should be able to effectively handle the most common exception and recover from them. To achieve this, exception handling routines were implemented. The basic process for the same is as follows:</p>
        <ol>
          <li>Store Exception Stack Frame onto the Supervisor Stack</li>
          <li>Check the type of exception (Bus Error, Address Error, etc.)</li>
          <li>Get the address of the exception handling subroutine from the exception vector table</li>
          <li>Execute code at that address</li>
        </ol>
        <p>Below is a list of exceptions handled by the implemented Monitor Program:</p>
        <ol>
          <li>Address Error: Occurs when the user tries to access a word or long size data from an odd address</li>
          <li>Bus Error: Occurs when the user tries to access an invalid or illegal address</li>
          <li>Illegal Instruction: Refers to any word bit patterns that do not match the bit pattern of the first word of a legal M68000 instruction</li>
          <li>Privilege Violation: An attempt to execute one of the privileged instructions while in user mode</li>
          <li>Divide by Zero: Instructon tries to divide a number by zero</li>
          <li>CHK Instruction Exception: The CHK instruction compares the value in the destination data register to zero and to the upper bound source operand. If the register value is less than zero or greater than the upper bound, a CHK Instruction Exception is raised.</li>
          <li>Line A &amp; Line F Emulators: Word patterns with bits 15–12 equaling 1010 or 1111 are distinguished as unimplemented instructions, and trying to execute these will raise a Line A Emulator Exception or a Line F Emulator Exception respectively.</li>
        </ol>
        <p>In order to execute the right exception handling routine, address of each exception handling routine was stored in the exception vector table starting at address 0x0. A screenshot of the exception vector table initialization is given below.</p>
        <figure id="excep">
          <img src={excep} alt='Exception Vectors Starting at Address 0x0'/>
          <figcaption>Figure 4: Exception Vector Table Initialization</figcaption>
        </figure>
      </article>
      <article className="project-article">
        <h1>Conclusion</h1>
        <p>	The Monitor Program is intended to enable a user who does not have the time or effort to write long programs to be able to perform their required operations using short and simple commands. As seen above, the current version of the Monitor Program provides 12 usuable commands; a list of these commands can be found in a prior section. The implemented monitor program was also tested for its functionality and its error-handling capabilities. For full details, refer to the documentation <a href="">here</a>.</p>
      </article>
    </ProjectPage>
  )
}

export default M68KPage
