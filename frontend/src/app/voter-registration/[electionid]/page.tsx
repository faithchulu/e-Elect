const VoterRegistrationPage = ( {params}:{params :{electionid : string}}) => {
  // const router = useRouter();
  // const { id } = router.query;

  return (
    <div>
      <h1>Voter Registration Page</h1>
      <p>ID: {params.electionid}</p>
    </div>
  );
};

export default VoterRegistrationPage;
