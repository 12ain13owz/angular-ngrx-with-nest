import { TestBed } from '@angular/core/testing'
import { Navigation } from './navigation.service'

describe('NavigationService', () => {
  let service: Navigation

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(Navigation)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
