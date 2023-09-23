import React, { Component } from "react";
import axios from "axios";
import SelectList from "../components/SelectList";
import {
  ProvinceItemInterface,
  RegencyItemInterface,
  SubdistrictItemInterface,
  WardItemInterface,
} from "./../interfaces/RegionList";
import { ComplementaryInterface } from "../interfaces/Complementary";

// home props
interface HomeProps {}

// home state
interface DataRegion<T> extends ComplementaryInterface {
  data: T[];
}

interface HomeState {
  provinces: DataRegion<ProvinceItemInterface>; // gabungan dari ProvinceItemInterface (di dalam property data) & ComplementaryInterface
  regencies: DataRegion<RegencyItemInterface>; // gabungan dari RegencyItemInterface (di dalam property data) & ComplementaryInterface
  subdistricts: DataRegion<SubdistrictItemInterface>; // gabungan dari SubdistrictItemInterface (di dalam property data) & ComplementaryInterface
  wards: DataRegion<WardItemInterface>; // gabungan dari WardItemInterface (di dalam property data) & ComplementaryInterface
}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);

    const complementary: ComplementaryInterface = {
      errorMessage: "",
      isError: false,
      isLoading: false,
    };

    this.state = {
      provinces: {
        data: [],
        ...complementary,
      },
      regencies: {
        data: [],
        ...complementary,
      },
      subdistricts: {
        data: [],
        ...complementary,
      },
      wards: {
        data: [],
        ...complementary,
      },
    };
  }

  componentDidMount(): void {
    this.fetchProvinces();
  }

  fetchProvinces = async (): Promise<void> => {
    try {
      this.setState({
        provinces: {
          ...this.state.provinces,
          isLoading: true,
        },
      });

      const data = await axios.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      );

      this.setState({
        provinces: {
          data: data.data,
          errorMessage: "",
          isError: false,
          isLoading: false,
        },
        regencies: {
          ...this.state.regencies,
          data: [],
        },
        subdistricts: {
          ...this.state.subdistricts,
          data: [],
        },
        wards: {
          ...this.state.wards,
          data: [],
        },
      });
    } catch (error) {
      this.setState({
        provinces: {
          data: [],
          errorMessage: error.message,
          isError: true,
          isLoading: false,
        },
      });
    }
  };

  fetchRegencies = async (provinceId: string): Promise<void> => {
    try {
      this.setState({
        regencies: {
          ...this.state.regencies,
          isLoading: true,
        },
      });

      const data = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
      );

      this.setState({
        regencies: {
          data: data.data,
          errorMessage: "",
          isError: false,
          isLoading: false,
        },
        subdistricts: {
          ...this.state.subdistricts,
          data: [],
        },
        wards: {
          ...this.state.wards,
          data: [],
        },
      });
    } catch (error) {
      this.setState({
        regencies: {
          data: [],
          errorMessage: error.message,
          isError: true,
          isLoading: false,
        },
      });
    }
  };

  fetchSubdistricts = async (subdistrictId: string): Promise<void> => {
    try {
      this.setState({
        subdistricts: {
          ...this.state.subdistricts,
          isLoading: true,
        },
      });

      const data = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${subdistrictId}.json`
      );

      this.setState({
        subdistricts: {
          data: data.data,
          errorMessage: "",
          isError: false,
          isLoading: false,
        },
        wards: {
          ...this.state.wards,
          data: [],
        },
      });
    } catch (error) {
      this.setState({
        subdistricts: {
          data: [],
          errorMessage: error.message,
          isError: true,
          isLoading: false,
        },
      });
    }
  };

  fetchWards = async (wardId: string): Promise<void> => {
    try {
      this.setState({
        wards: {
          ...this.state.wards,
          isLoading: true,
        },
      });

      const data = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${wardId}.json`
      );

      this.setState({
        wards: {
          data: data.data,
          errorMessage: "",
          isError: false,
          isLoading: false,
        },
      });
    } catch (error) {
      this.setState({
        wards: {
          data: [],
          errorMessage: error.message,
          isError: true,
          isLoading: false,
        },
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="container bg-light p-5 my-5 border border-2 border-info rounded"
          style={{ maxWidth: "800px" }}
        >
          <h1 className="fs-2 text-center mb-3">Temukan Daerah Anda!</h1>
          <div className="mb-3">
            {this.state.provinces.isLoading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {this.state.provinces.isError ? (
                  <p>{this.state.provinces.errorMessage}</p>
                ) : (
                  <SelectList
                    title="Pilih Provinsi"
                    data={this.state.provinces.data}
                    fetchOther={this.fetchRegencies}
                  />
                )}
              </>
            )}
          </div>
          <div className="mb-3">
            {this.state.regencies.isLoading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {this.state.regencies.isError ? (
                  <p>{this.state.regencies.errorMessage}</p>
                ) : (
                  <SelectList
                    title="Pilih Kabupaten / Kota"
                    data={this.state.regencies.data}
                    fetchOther={this.fetchSubdistricts}
                  />
                )}
              </>
            )}
          </div>
          <div className="mb-3">
            {this.state.subdistricts.isLoading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {this.state.subdistricts.isError ? (
                  <p>{this.state.subdistricts.errorMessage}</p>
                ) : (
                  <SelectList
                    title="Pilih Kecamatan"
                    data={this.state.subdistricts.data}
                    fetchOther={this.fetchWards}
                  />
                )}
              </>
            )}
          </div>
          <div className="mb-3">
            {this.state.wards.isLoading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {this.state.wards.isError ? (
                  <p>{this.state.wards.errorMessage}</p>
                ) : (
                  <SelectList
                    title="Pilih Kelurahan / Desa"
                    data={this.state.wards.data}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
