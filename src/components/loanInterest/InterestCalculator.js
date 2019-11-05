import React from 'react'

import axios from '../../config/axios'
import '../../css/App.css'
import SliderComponent from '../slider/sliderMain'

export default class CustomerList extends React.Component {
     constructor(){
          super()
          this.state={
              amount:1000,
              numMonths:10,
              interestRate:0,
              monthlyPayment:0,
              isLoading:true
          }
     }

     updateAmount = ([amount])=>{
         this.setState({amount})
         axios.get('/interest',{
            params:{
                amount:this.state.amount,
                numMonths:this.state.numMonths
            }
        })
             .then(response => {
                if(response.data.status){
                    alert(response.data.message)
                }
                const interestRate = response.data.interestRate
                const monthlyPayment = response.data.monthlyPayment.amount
                this.setState({ interestRate, monthlyPayment })
             })
             .catch(err=>{
                  console.log(err)
             })
     }

     updateduration = ([numMonths])=>{
        this.setState({numMonths})
        axios.get('/interest',{
           params:{
               amount:this.state.amount,
               numMonths:this.state.numMonths
           }
       })
            .then(response => {
                if(response.data.status){
                    alert(response.data.message)
                }
                const interestRate = response.data.interestRate
                const monthlyPayment = response.data.monthlyPayment.amount
                this.setState({ interestRate, monthlyPayment })
            })
            .catch(err=>{
                 console.log(err)
            })
     }

     componentDidMount(){
          axios.get('/interest',{
              params:{
                  amount:this.state.amount,
                  numMonths:this.state.numMonths
              }
          })
               .then(response => {
                    if(response.data.status){
                        alert(response.data.message)
                    } 
                    this.setState({isLoading:false})
                    const interestRate = response.data.interestRate
                    const monthlyPayment = response.data.monthlyPayment.amount
                    this.setState({ interestRate, monthlyPayment })

                    const search = {
                        amount:this.state.amount,
                        numMonths:this.state.numMonths,
                        interestRate:this.state.interestRate,
                        monthlyPayment:this.state.interestRate
                    }
               })
               .catch(err=>{
                    console.log(err)
               })

     }

    amountSliderProps = {
        updateAmount: this.updateAmount,
        domain: [500, 5000],
        defaultValues: [500]
    }

    durationSliderProps = {
        updateAmount: this.updateduration,
        domain: [10, 24],
        defaultValues: [10]
    }

     render(){
          return (
               <div className="App-body">
                    { this.state.isLoading ? (<p>loading...</p>): (
                        <div>
                            <h2>Select principal amount in USD and duration in months </h2>
                            <h4>InterestRate: {this.state.interestRate}</h4>
                            <h4>To be paid monthly: {this.state.monthlyPayment}</h4>
                            <p>principal($)</p>
                            <SliderComponent {...this.amountSliderProps} />
                            
                            <p>Duration</p>
                            <SliderComponent {...this.durationSliderProps} />
                            
                        </div>
                    )}
                
               </div>
          )
     }
}