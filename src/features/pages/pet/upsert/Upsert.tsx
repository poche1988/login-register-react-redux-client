import { RouteComponentProps } from 'react-router'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import IPetUpsert from '../../../../models/pets/IPetUpsert'
import petRepository from '../../../../app/api/repositories/petRepository'
import usePetDispatcher from '../../../../stores/pet/usePetDispatcher'
import * as Yup from 'yup'
import MyTextInput from '../../../components/shared/form/MyTextInput'
import MyDatePicker from '../../../components/shared/form/MyDatePicker'
import MySelect from '../../../components/shared/form/MySelect'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import IKeyValueText from '../../../../models/shared/IKeyValueText'
import IBreedModel from '../../../../models/pets/IBreedModel'
import breedRepository from '../../../../app/api/repositories/breedRepository'

interface MatchParams {
  id: string
}

const Upsert = ({
  match,
  history,
}: RouteComponentProps<MatchParams>): JSX.Element => {
  const { Addpet, Editpet } = usePetDispatcher()
  const [animals, setAnimals] = useState<IKeyValueText[]>([])
  const [animalSelected, setAnimalSelected] = useState<number>()
  const [breeds, setBreeds] = useState<IBreedModel[]>([])
  const [upsertPet, setUpsertModel] = useState<IPetUpsert>({
    id: 0,
    name: '',
    dateOfBirth: null,
    animalId: 0,
    breedId: 0,
  })

  useEffect(() => {
    getAnimals()

    if (isEdit()) {
      petRepository.pet(parseInt(match.params.id)).then((response) => {
        setUpsertModel(response)
        getBreedsForAnimalSelected(response.animalId)
      })
    }
  }, [])

  useEffect(() => getBreedsForAnimalSelected(animalSelected), [animalSelected])

  const isEdit = (): boolean => {
    return match.params.id !== undefined
  }

  const getAnimals = (): void => {
    breedRepository.Animals().then((response) => {
      setAnimals(
        response.map(
          (r) => ({ key: r.id, value: r.id, text: r.name } as IKeyValueText),
        ),
      )
    })
  }

  const getBreedsForAnimalSelected = (animalId: number | undefined): void => {
    if (animalId && animalId > 0) {
      breedRepository.Breeds(animalId).then((response) => setBreeds(response))
    } else setBreeds([])
  }

  const handleSave = async (creds: IPetUpsert) => {
    try {
      if (creds.id === 0) handleCreatePet(creds)
      else handleEditPet(creds)
    } catch (e) {
      throw e
    }
  }

  const handleCreatePet = (pet: IPetUpsert) => {
    petRepository.create(pet).then((p) => {
      Addpet(p)
      history.push(`/Pets/${p.id}`)
    })
  }

  const handleEditPet = (pet: IPetUpsert) => {
    petRepository.update(pet).then((p) => {
      Editpet(p)
      history.push(`/Pets/${p.id}`)
    })
  }

  const PetSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    dateOfBirth: Yup.date().required('Required').nullable(),
    breedId: Yup.number().required('Required').moreThan(0, 'Required'),
  })

  return (
    <Formik
      initialValues={{
        id: upsertPet.id,
        name: upsertPet.name,
        dateOfBirth: upsertPet.dateOfBirth
          ? new Date(upsertPet.dateOfBirth)
          : new Date(),
        animalId: upsertPet.animalId,
        breedId: upsertPet.breedId,
        error: null,
      }}
      validationSchema={PetSchema}
      enableReinitialize={isEdit()}
      onSubmit={(values) =>
        handleSave(values).catch((e) => console.log(e.response.data))
      }
    >
      {({ handleSubmit, handleChange }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput label="Pet name" name="name" placeholder="Name" />
          <MyDatePicker
            label="Date of Birth"
            name="dateOfBirth"
            placeholder="Date of Birth"
          />
          <MySelect
            label="Animal"
            customOnChange={setAnimalSelected}
            fieldToClear={'breedId'}
            onChange={handleChange}
            options={animals}
            name="animalId"
          />
          <MySelect
            label="Breed"
            onChange={handleChange}
            options={breeds.map((b) => ({
              key: b.id,
              value: b.id,
              text: b.name,
            }))}
            name="breedId"
          />
          <Button
            as={Link}
            to={upsertPet?.id !== 0 ? `/Pets/${upsertPet?.id}` : `/Pets`}
            floated="right"
            type="button"
            content="cancel"
          />
          <Button positive content="Save" type="submit" fluid />
        </Form>
      )}
    </Formik>
  )
}

export default Upsert
