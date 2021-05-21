import { Tabs, Tab } from 'react-bootstrap'
import React, { Component } from 'react';
// import Checklist from '../../Checklist.json'
import Checklist from '/Users/alexa/PycharmProjects/dChecklist/src/abis/Checklist.json'
import Web3 from 'web3';
import './App.css';

//h0m3w0rk - add new tab to check accrued interest

class App extends Component {

  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    //check if MetaMask exists
    // if (typeof web3 !== 'undefined') {
    //   App.web3Provider = web3.currentProvider;
    //   const web3 = new Web3(web3.currentProvider);
    // } else {
    //   // If no injected web3 instance is detected, fallback to Ganache.
    //   App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
    //   const web3 = new Web3(App.web3Provider);
    // }
    if(typeof window.ethereum !== 'undefined'){
      //assign to values to variables: web3, netId, accounts
      const web3 = new Web3(window.ethereum)
      // try {
      //   // Request account access if needed
      //   await window.ethereum.enable();
      //   // Acccounts now exposed
      //   return web3;
      // } catch (error) {
      //   console.error(error);
      // }
      const netId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()

      if (typeof accounts[0]!=='undefined'){ //check if account is detected, then load balance&setStates, else push alert
        const balance = await web3.eth.getBalance(accounts[0])
        this.setState({account: accounts[0], balance: balance, web3: web3})
      }else{
        window.alert('Please sign in with MetaMask')
      }
      //in try block load contracts
      try {
        const checklist = new web3.eth.Contract(Checklist.abi, Checklist.networks[netId].address)
        // console.log(checklist)  // Contract {}
        // console.log(Checklist)  // {contractName: "Checklist", abi: Array(10), metadata: "{"compiler":{"version":"0.7.6+commit.7338295f"},"l…ZGXUedu2bSLYnpiM3E9V3inviXQSJNxC"]}},"version":1}", bytecode: "0x60806040526001600460156101000a81548160ff02191690…45e5d061682d6491814a97ef98964736f6c63430007060033", deployedBytecode: "0x608060405234801561001057600080fd5b50600436106100…45e5d061682d6491814a97ef98964736f6c63430007060033", …}
        const ChecklistAddress = await Checklist.networks[netId].address  // Good, is address
        let ChecklistName = await checklist.methods.getName.call().call()
        const ChecklistFunds = await checklist.methods.getFunds.call().call()
        const Payer = await checklist.methods.getPayer.call().call()
        const Contractor = await checklist.methods.getContractor.call().call()
        const ChecklistCost = await checklist.methods.getCost.call().call()
        const ChecklistLocked= await checklist.methods.getLockStatus.call().call()
        const ContractorUnlock = await checklist.methods.getContractorUnlock.call().call()
        const PayerUnlock = await checklist.methods.getPayerUnlock.call().call()
        console.log(PayerUnlock)
        const TaskNumbers = await checklist.methods.getTaskNumbers.call().call()
        const isPayer = (Payer === this.state.account)
        const isContractor =  (Contractor === this.state.account)
        const tasks = []
        let task = [];
        for (const i in TaskNumbers) {
          task = await checklist.methods.getTask(i).call()
          tasks.push(task)
        }
        this.setState({checklist: checklist, ChecklistAddress: ChecklistAddress,
          ChecklistName: ChecklistName, ChecklistFunds: ChecklistFunds, Payer: Payer,
        Contractor: Contractor, ChecklistCost: ChecklistCost, ChecklistLocked:ChecklistLocked,
        ContractorUnlock: ContractorUnlock, PayerUnlock: PayerUnlock, TaskNumbers: TaskNumbers,
        isPayer: isPayer, isContractor: isContractor, tasks: tasks})
      } catch (e){
        console.log('error', e)
        // window.alert('Contracts not deployed to the current network')
      }

    } else{  //if MetaMask not exists push alert
      window.alert('Please install MetaMask')
    }
  }


  async addTask(name, number, amount) {
    if (this.state.checklist !== null) {  //check if this.state.dbank is ok
      //in try block call addTask deposit();
      try{
        console.log('Add task?')
        let success, price
        [success, price] = await this.state.checklist.methods.addTask(name, number, amount).send({from: this.state.account})
        console.log(success, price)
      } catch (e){
        console.log('Error, add task failed: ', e)
      }
    }
  }
  async lockContract() {
    if(this.state.checklist !== null) {
      if (this.state.account === this.state.Contractor) {
        let temp = await this.state.checklist.methods.lockChecklist().call().call().send({from: this.state.account})
        console.log(temp)
      } else if (this.state.account === this.state.Payer) {
        let temp = await this.state.checklist.methods.lockChecklist().call().call().send({from: this.state.account})
        console.log(temp)
      } else {
        console.log("Fuu")
      }
    } else{
      console.log('Double Fuu')
    }
}
  // async withdraw(e) {
  //   //prevent button from default click
  //   e.preventDefault()
  //   //check if this.state.dbank is ok
  //   if(this.state.dbank !=='undefined'){
  //     try{  //in try block call dBank withdraw();
  //       await this.state.dbank.methods.withdraw().send({from: this.state.account})
  //     } catch(e) {
  //       console.log('Error, withdraw: ', e)
  //     }
  //   }
  // }
  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      checklist: null,
      ChecklistAddress: null,
      ChecklistName: '',
      ChecklistFunds: 0,
      Payer: null,
      Contractor: null,
      ChecklistCost: null,
      ChecklistLocked:false,
      ContractorUnlock:true,
      PayerUnlock: true,
      TaskNumbers: null,
      isPayer: false,
      isContractor: false,
      tasks: null
    }
  }


  render() {
    let funcs;
    if (this.state.tasks !== null) {

      let cUnlock = this.state.ContractorUnlock;
      let pUnlock = this.state.PayerUnlock;
      let Status;
      if (cUnlock && pUnlock){
        Status = <h2>Status: Pending {this.state.ChecklistLocked}</h2>
      } else if (cUnlock && !pUnlock) {
        Status = <h2>Status: Waiting for Contractor Confirmation</h2>
      } else if (!cUnlock && pUnlock){
        Status =  <h2>Status: Waiting for Payer Confirmation</h2>
      } else{
        Status =  <h2>Status: Locked</h2>
      }
      const taskItems = this.state.tasks.map((task) =>
          <li key={task[0]}>{task[0]} - Estimated price: {Web3.utils.fromWei(task[1])}</li>

      );
    if (this.state.isContractor) {
      funcs = <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="viewTasks" title="View Tasks">
        <div>
          <br></br>
          <h3>{this.state.ChecklistName}</h3>
          <br></br>
          Estimated total cost: {this.state.ChecklistCost}
          <br></br>
          <br></br>
          <ol>
            {taskItems}
          </ol>
        </div>
        </Tab>
        <Tab eventKey="addTask" title="Add Task">
        <div>
          <br></br>
          Enter the description, amount, and order of your task.
          <br></br>
          <br></br>
          <form onSubmit={(e) => {
            e.preventDefault()
            let name = this.taskName.value
            let amount = this.taskAmount.value
            let order = this.order.value
            amount = Web3.utils.toWei(amount) //convert to wei
            this.addTask(name, order, amount).then(r => e)  // do function on submit
            // console.log(e)
          }}>
            <div className='form-group mr-sm-2'>
              <br></br>
              <input
                  id='taskName'
                  type='string'
                  className="form-control form-control-md"
                  placeholder='Task Name'
                  required
                  ref={(input) => {
                    this.taskName = input
                  }}
              />
              <br></br>
              <input
                  id='order'
                  step="1"
                  type='number'
                  defaultValue={0}
                  className="form-control form-control-md"
                  placeholder='Order'
                  required
                  ref={(input) => {
                    this.order = input
                  }}
              />
              <br></br>
              <input
                  id='amount'
                  step="0.01"
                  type='number'
                  className="form-control form-control-md"
                  placeholder='amount...'
                  required
                  ref={(input) => {
                    this.taskAmount = input
                  }}
              />
            </div>
            <button type='submit' className='btn btn-primary'>DEPOSIT</button>
          </form>
        </div>
        </Tab>
        <Tab eventKey="lockUnlock" title="Lock/Unlock Contract">
        <div>
          <br></br>
          {Status}
          <br></br>
          Estimated total cost: {this.state.ChecklistCost}
          <br></br>
          <br></br>
          <ol>
            {taskItems}
          </ol>
        </div>
        </Tab>
      </Tabs>
    }
    else if (this.state.isPayer) {
      let button;
      if (pUnlock){
        button = <button id={'lock'} className={'btn btn-outline-secondary'}>Lock-in Your Side?</button>
      } else{
        button = <button id={'lock'} value={1} className={'btn btn-secondary'}>Back out?</button>
      }

      funcs = <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
        <Tab eventKey="viewTasks" title="View Tasks">
        <div>
          <br></br>
          <h3>{this.state.ChecklistName}</h3>
          <br></br>
          Estimated total cost: {this.state.ChecklistCost}
          <br></br>
          <br></br>
          <ol>
            {taskItems}
          </ol>
        </div>
        </Tab>
        <Tab eventKey="lockUnlock" title="Lock/Unlock Contract">
        <div>
          <br></br>
          {Status}
          <br></br>
          <form onSubmit={(e) => {
            e.preventDefault()
            this.lockContract().then(r => e)  // do function on submit
            console.log(e)
          }}>
            {button}
          </form>
        </div>
        </Tab>
      </Tabs>
    }
  }
  else {  // There are no contracts with this metamask account
    funcs = <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
      <Tab title="No in-progress Contracts">null</Tab>
      </Tabs>
  }
    return (
      <div className='text-monospace'>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            target="_blank"
            rel="noopener noreferrer"
          >
        <b>Contractd</b>
        </a>
        </nav>
        <div className="container-fluid mt-5 text-center">
        <br></br>
          <h1>Welcome to Contractd!</h1>
          <h5>{this.state.account}</h5>
          <br></br>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                {funcs}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
                {/*<Tab eventKey="withdraw" title="Withdraw">*/}
                {/*  <br></br>*/}
                {/*    Do you want to withdraw + take interest?*/}
                {/*    <br></br>*/}
                {/*    You have {this.state.dBankBalance} ETH deposited.*/}
                {/*    <br></br>*/}
                {/*    <br></br>*/}
                {/*  <div>*/}
                {/*    <button type='submit' className='btn btn-primary' onClick={(e) => this.withdraw(e)}>WITHDRAW</button>*/}
                {/*  </div>*/}
                {/*</Tab>*/}
                {/*<Tab eventKey="interest" title="Interest">*/}
                {/*  <br></br>*/}
                {/*    You have {this.state.tokenBalance} {this.state.tokenName} tokens*/}
                {/*    <br></br>*/}
                {/*    <br></br>*/}
                {/*  <div>*/}
                {/*    <button type='submit' className='btn btn-primary' onClick={(e) => this.withdraw(e)}>WITHDRAW</button>*/}
                {/*  </div>*/}
                {/*</Tab>*/}
export default App;