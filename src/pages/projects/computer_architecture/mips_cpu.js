import * as React from 'react'
import { ProjectPage } from '../../../components/ProjectPage'

import '../../../styles/app.css'

// Images

import example from '../../../images/computer_architecture/mips_cpu/example.png';
import alu1 from '../../../images/computer_architecture/mips_cpu/alu1.png';
import alu2 from '../../../images/computer_architecture/mips_cpu/alu2.png';
import cache from '../../../images/computer_architecture/mips_cpu/cache.png';
import final_schem from '../../../images/computer_architecture/mips_cpu/final_schem.png';
import ir1 from '../../../images/computer_architecture/mips_cpu/ir1.png';
import ir2 from '../../../images/computer_architecture/mips_cpu/ir2.png';
import mc1 from '../../../images/computer_architecture/mips_cpu/mc1.png';
import mc2 from '../../../images/computer_architecture/mips_cpu/mc2.png';
import mcu from '../../../images/computer_architecture/mips_cpu/mcu.png';
import pcu_table from '../../../images/computer_architecture/mips_cpu/pcu_table.png';
import pcu1 from '../../../images/computer_architecture/mips_cpu/pcu1.png';
import pcu2 from '../../../images/computer_architecture/mips_cpu/pcu2.png';
import rb from '../../../images/computer_architecture/mips_cpu/rb.png';
import rough_schem from '../../../images/computer_architecture/mips_cpu/rough_schem.png';

const MIPSPage = () => {
  return (
    <ProjectPage image={ example } title="Implementation of a MIPS CPU in VHDL" >    
      <article className="project-article">
        <h1>Task</h1>
        <p>This project includes the implementation of a CPU that supports a RISC instruction set (MIPS). To support this implementation, seven components, the Instruction Register, Memory (Cache) associated with a Memory Controller, Registers Block, ALU, Control Unit, and the PC Unit (or PCU), were implemented. The reduced instruction set this CPU supports include the following instructions:</p>
        <ol>
          <li>Load Word → eg. lw $t1, 0x4($t0)</li>
          <li>Add → add $t2, $t3, $t4</li>
          <li>Subtract → sub $t1, $t5, $t7</li>
          <li>Logical AND → and $t3, $t3, $t4</li>
          <li>Logical OR → or $t3, $t4, $t2</li>
          <li>Jump → j LABEL</li>
          <li>Branch if equal → beq $t1, $t2, LABEL</li>
          <li>Add immediate → addi $t3, $t2, 0x4</li>
          <li>Store Word → sw $t7, 0x0($t1)</li>
          <li>Set on Less Than → slt $t3, $t2, $t1</li>
          <li>Logical NOR → nor $t2, $t7, $t5</li>
          <li>Logical AND immediate → andi $t2, $t5, 0xFFE</li>
          <li>Logical OR immediate → ori $t3, $t3, 0x1</li>
        </ol>
      </article>
      <article className="project-article">
        <h1>Overall Design</h1>
        <p>The MIPS datapath shown in the figure below was used as the base for designing the CPU in this project. To an extent, the basic components were the same, though slight modifications were made to each, and new components were added. This was done in order to keep the design as simple as possible since the project only required compatibility with a limited number of instructions rather than entire MIPS Instruction Set Architecture.</p>
        <figure id="base_dp">
          <img src={example} alt="Base Datapath Design"/>
          <figcaption>Figure 1: MIPS Multicycle Datapath</figcaption>
        </figure>
        <p>Instruction and data memory were grouped into a single entity, similar to the MIPS datapath above. A simple on-board memory (Cache)&mdash;comprising of an array of variables with read/write access&mdash;was implemented to be able to store program instructions and data. A Memory Controller unit was also implemented to route data between the CPU and this Cache. Note, however, that the term "cache" here is just used to represent an on-board memory space owned by the CPU; the cache built here doesn't exhibit the properties of a typical "cache".</p>
        <p>The instruction register (IR) was modified to also perform the instruction decode (ID) stage of execution. This was possible due to a limited instruction set, as well as the fact that there was no overlap between any of the opcodes of func codes of the instructions. Accordingly, using a simple if-else block, the opcodes and func codes were mapped to a four-bit value that determined the instruction being executed. The table listing these values is given in the appropriate section later. Another change to the IR was that it now also performed the sign-extend operation; this was done to limit the total number of components in the CPU.</p>
        <p>Next, the registers block and the ALU were not changed drastically from the MIPS design. The only change was that all the external MUXs were combined into these two entities. The control signals for these MUXs were also routed to the register block and ALU. The ALU was also not implemented separately in this project. Instead, it's operation was incorporated into the single Main Control Unit (MCU).</p>
        <p>Finally, all PC update operations&mdash;including the jump, branch, as well as the default PC+4 operation&mdash;were performed by a newly designed component, the PC Unit, or PCU. Accordingly, this entity receives inputs from the IR and the PCU itself (the old PC value), as well as control signals from the MCU.</p>
        <p>With that, all components of the CPU have been mentioned. A schematic for the entire datapath is given below.</p>
        <figure id="rough_schem">
          <img src={rough_schem} alt="Rough Schematic"/>
          <figcaption>Figure 2: Rough Schematic of Proposed Datapath</figcaption>
        </figure>
        <p>In this online portfolio, brief descriptions (along with screenshots) of the various components designed in this project will be included. For a complete documentation of the CPU implementation (as well as VHDL code), follow this <a href="">link</a>.</p>
      </article>
      <article className="project-article">
        <h1>ALU</h1>
        <p>The 32 bit ALU was designed to perform the arithmetic and logical operations performed by the CPU. This block uses the following 2 control signals:</p>
        <ol>
          <li>ALUSrc → ALUSrc is used to select the correct value to be used in the calculation of OUTPUT and ZERO. This value can either be INPUT_IMM or INPUT_B.</li>
          <li>ALUOp → ALUOp is then used to select the correct operation to be performed (ADD, SUBTRACT, etc.).</li>
        </ol>
        <p>The ZERO output is always calculated and used in the PCU. The schematic for the ALU is given below:</p>
        <figure id="alu1">
          <img src={alu1} alt="Block View"/>
          <figcaption>Figure 3: ALU Block View</figcaption>
        </figure>
        <figure id="alu2">
          <img src={alu2} alt="Internal View"/>
          <figcaption>Figure 4: ALU Internal View</figcaption>
        </figure>
      </article>
      <article className="project-article">
        <h1>Instruction Register</h1>
        <p>The Instruction Register was designed to allow the CPU to parse an instruction and hold these values until the next instruction is fetched. This was achieved by using a single control signal&mdash;IRWrite.</p>
        <p>IRWrite is used to simply inform the Instruction Register that there is a new instruction that needs to be parsed. This signal is also used so that the outputs&mdash;IMM, INSTRUCT_TYP, JMP_ADDRESS, REG1, REG2 and REG3&mdash;are held until the next instruction is fetched. This function is achieved by the use of a latch (a register in VHDL). The schematic for the Instruction Register is given below:</p>
        <figure id="ir1">
          <img src={ir1} alt="Block View"/>
          <figcaption>Figure 5: Instruction Register Block View</figcaption>
        </figure>
        <figure id="ir2">
          <img src={ir2} alt="Internal View"/>
          <figcaption>Figure 6: Instruction Register Internal View</figcaption>
        </figure>
      </article>
      <article className="project-article">
        <h1>Registers Block</h1>
        <p>The Registers Block was designed to allow the CPU to hold values on which operations are being performed, without having to read to and write from main memory&mdash;which typically takes more clock cycles, thus slowing down the CPU operation. The Registers Block designed here also performs the task of selecting the correct indices of registers to read from. This was achieved by using three control signals.</p>
        <ol>
          <li>MemToReg → MemToReg is used to select between WRITEDATA_MEM and WRITEDATA_ALU  values to write.</li>
          <li>REGWRITE→ This control signal is used to select when to write back to a register.</li>
          <li>RegDst → Finally, RegDst is used to select which register the value is to be written to.</li>
        </ol>
        <p>The Registers Block is used for both selecting data to be passed forward to the ALU and Writing back to registers. The schematic for this component is given below.</p>
        <figure id="rb">
          <img src={rb} alt="Block View"/>
          <figcaption>Figure 7: Registers Block Schematic</figcaption>
        </figure>
      </article>
      <article className="project-article">
        <h1>Cache</h1>
        <p>A simple block of memory was designed to test the functionality of the CPU. This block, hereafter called the "Cache", uses a simple read/write mechanism. To enable this, an "Address" input, as well as 2 control signals&mdash;MemRead &amp;MemWrite&mdash;were added. Two buses, one for receiving input data (MemIn) and one for outputting data (MemOut) were also used. The schematic for the Cache is given below.</p>
        <figure id="cache">
          <img src={cache} alt="Block View"/>
          <figcaption>Figure 8: Cache Schematic</figcaption>
        </figure>
        <p>Internally, the Cache contains an array of 32-bit STD_LOGIC_VECTOR with integer index. Accordingly, each line of memory is 32-bit long and therefore stores a whole word. This was done because, in the MIPS architecture, everything is 32-bit long. Also, this project did not require implementing instructions such as lb, lh, or other such instructions that access byte or halfword sized memory.</p>
        <p>Based on the address inputted to the Cache, the data of the appropriate memory location is continuously outputted. On the other hand, the data on the MemIn bus is only written to memory if the MemWrite signal is enabled; the MemRead signal similarly controls the updating of the data on the MemOut bus. Since a single line in the memory is 32-bit long rather than the traditional 8-bit structure, the address inputted to the Cache is first divided by 4 and then converted into an integer, before using it as an index for reading or writing data. Also, since the size of the Cache is extremely limited as compared to the required 232 addresses accessible by a 32-bit PC, the inputted address is modded by 1024 (which is the size of the implemented Cache), which effectively loops the memory locations around the Cache block.</p>
      </article>
      <article className="project-article">
        <h1>Memory Controller</h1>
        <p>To connect the Cache with other components in the CPU, a Memory Controller unit was created. It's main purpose is to route appropriate data and memory addresses, as well as the control signals from the MCU, to the Cache such that it can function as required. The schematic for the Memory Controller is given below.</p>
        <figure id="mc1">
          <img src={mc1} alt="Block View"/>
          <figcaption>Figure 9: MemControl Block View</figcaption>
        </figure>
        <figure id="mc2">
          <img src={mc2} alt="Internal View"/>
          <figcaption>Figure 10: MemControl Internal View</figcaption>
        </figure>
        <p>There are two sources of Addresses available to the Memory Controller. Firstly, the Memory Controller receives the updated PC from the PCU though the IAddress bus. This address&mdash;forwarded to the Cache on the AddressOut bus&mdash;is used to fetch instructions from memory, which is outputted on the RData bus. The Memory Controller also receives an address from the ALU, the DAddress, which is the result of the addition of the register content and 32-bit sign-extended immediate value in the lw &amp;sw instructions. This address is, therefore, used to read data from memory, which is also outputted on the RData bus. During the execution of a sw instruction, the data to be written to memory is inputted on the WData bus. Finally, the 2 of the 3 control signals, i.e. MemRead &amp;MemWrite, were forwarded to the Cache block on the MemReadOut &amp;MemWriteOut outputs. The IorD control signal was used to prevent data to be written to memory when using the IAddress&mdash;MemWriteOut was always disabled when using IAddress, regardless of the MemWrite control signal from the MCU.</p>
      </article>
      <article className="project-article">
        <h1>PCU</h1>
        <p>The PCU was designed to perform the task of updating the current PC value to the new PC, based on the instruction being executed. The schematic for this component is given below.</p>
        <figure id="pcu1">
          <img src={pcu1} alt="Block View"/>
          <figcaption>Figure 11: PCU Block View</figcaption>
        </figure>
        <figure id="pcu2">
          <img src={pcu2} alt="Internal View"/>
          <figcaption>Figure 12: PCU Internal View</figcaption>
        </figure>
        <p>The PCU consists of two adders: one takes the current PC value (OPC) and adds 4 to it while the other uses the 32-bit sign-extended branch offset (BOffset) from the IR, which is first left-shifted by 2 bits and then added to the PC+4 result. The 26-bit jump address (JAddress) from the IR is left-shifted by 2 bits, after which the upper 4 bits (31:28) of the PC+4 result is appended to the left of this value. Depending on the PCSrc control signal from the MCU, as well as the Zero output of the ALU (used to decide whether or not to branch in a beq instruction), the appropriate value of the new PC is evaluated and stored in a variable (RTL latch), which is only outputted over the NPC bus when the PCWrite control signal from the MCU is enabled. The different values for the PCSrc control signal are given below. The default operation is PC + 4.</p>
        <figure id="pcu_table">
          <img src={pcu_table} alt="PCU Table"/>
          <figcaption>Figure 13: PCU Operations</figcaption>
        </figure>
      </article>
      <article className="project-article">
        <h1>MCU</h1>
        <figure id="mcu">
          <img src={mcu} alt="Block View"/>
          <figcaption>Figure 14: MCU Schematic</figcaption>
        </figure>
        <p>The MCU controls the entire functioning of the CPU. Using the clock input, it synchronizes all components. The execution of any given instruction is broken down into a fixed number of stages, with each stage running in a single clock cycle. An output displaying the number of the stage being executed in a particular clock cycle is added to the MCU in order to enable efficient testing. The different possible stages are as follows:</p>
        <ol>
          <li>IF: MemControl receives the next instruction address from the PCU and fetches a word from memory at that address.</li>
          <li>ID: The instruction register decodes the different parts of the instruction.</li>
          <li>REG: The Registers block outputs read register values.</li>
          <li>ALU: The ALU performs the required computation.</li>
          <li>MEM: MemControl receives data address from the ALU and fetches/writes a word from/to that memory location.</li>
          <li>WB: The Registers block receives data from the ALU or MemControl and writes it to the appropriate register.</li>
          <li>PC: The NPC is computed depending on the instruction.</li>
          <li>PCW: PC is updated.</li>
        </ol>
        <p>The full implementation of the MCU is quite extensive and was, therefore, not included in this portfolio. Refer to the <a href="">documentation</a> to learn more, if interested.</p>
      </article>
      <article className="project-article">
        <h1>End Result</h1>
        <p>After combining all components of the CPU&mdash;adding one component at a time&mdash;the final schematic of the CPU was as follows:</p>
        <figure id="final_schem">
          <img src={final_schem} alt="Final Schematic"/>
          <figcaption>Figure 15: Final Schematic of MIPS CPU</figcaption>
        </figure>
      </article>
    </ProjectPage>
  )
}

export default MIPSPage
