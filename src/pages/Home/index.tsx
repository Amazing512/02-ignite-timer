import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

import { Countdown } from './components/Countdown'
import { NewCycleForm } from './components/NewCycleForm'
import {
  NewCycleFormProps,
  newCycleFormValidationSchema,
} from './components/NewCycleForm/validation'
import { useCyclesContext } from '../../contexts/CyclesContext'

export function Home() {
  const { createNewCycle, activeCycle, interruptCurrentCycle } =
    useCyclesContext()

  const newCycleForm = useForm<NewCycleFormProps>({
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
    resolver: zodResolver(newCycleFormValidationSchema),
  })
  const { watch, handleSubmit, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormProps) {
    createNewCycle(data)
    reset()
  }

  function handleInterruptCurrentCycle() {
    interruptCurrentCycle()
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton
            type="button"
            onClick={handleInterruptCurrentCycle}
          >
            <HandPalm />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
