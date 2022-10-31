using Optional;
using Triplex.Validations;

namespace RI.Novus.Core.Users;

///<summary>Represents User entity. </summary>
public sealed class User 
{
	///<summary>Represents User's EmployeeId. </summary>
	public EmployeeId EmployeeId { get; }

	///<summary>Represents User's Names. </summary>
	public Names Names { get; }

	///<summary>Represents User's NamesWithMin. </summary>
	public NamesWithMin NamesWithMin { get; }

	///<summary>Represents User's NamesWithMax. </summary>
	public NamesWithMax NamesWithMax { get; }

	///<summary>Represents User's NamesWithMinMax. </summary>
	public NamesWithMinMax NamesWithMinMax { get; }

	///<summary>Represents User's NamesWithRegex. </summary>
	public NamesWithRegex NamesWithRegex { get; }

	///<summary>Represents User's NamesWithRegexMin. </summary>
	public NamesWithRegexMin NamesWithRegexMin { get; }

	///<summary>Represents User's NamesWithRegexMax. </summary>
	public NamesWithRegexMax NamesWithRegexMax { get; }

	///<summary>Represents User's NamesWithRegexMinMax. </summary>
	public NamesWithRegexMinMax NamesWithRegexMinMax { get; }

	///<summary>Represents User's IntegerId. </summary>
	public IntegerId IntegerId { get; }

	///<summary>Represents User's IntegerIdMin. </summary>
	public IntegerIdMin IntegerIdMin { get; }

	///<summary>Represents User's IntegerIdMax. </summary>
	public IntegerIdMax IntegerIdMax { get; }

	///<summary>Represents User's IntegerIdMinAndMax. </summary>
	public IntegerIdMinAndMax IntegerIdMinAndMax { get; }

	///<summary>Represents User's DecimalSalary. </summary>
	public DecimalSalary DecimalSalary { get; }

	///<summary>Represents User's DecimalSalaryMin. </summary>
	public DecimalSalaryMin DecimalSalaryMin { get; }

	///<summary>Represents User's DecimalSalaryMax. </summary>
	public DecimalSalaryMax DecimalSalaryMax { get; }

	///<summary>Represents User's DecimalSalaryMinAndMax. </summary>
	public DecimalSalaryMinAndMax DecimalSalaryMinAndMax { get; }

	///<summary>Represents User's Birthday. </summary>
	public Birthday Birthday { get; }

	///<summary>Represents User's Type. </summary>
	public Type Type { get; }

	private User(Builder builder)
	{
		Arguments.NotNull(builder, nameof(builder));
		EmployeeId = builder.EmployeeIdOption.ValueOrFailure();
		Names = builder.NamesOption.ValueOrFailure();
		NamesWithMin = builder.NamesWithMinOption.ValueOrFailure();
		NamesWithMax = builder.NamesWithMaxOption.ValueOrFailure();
		NamesWithMinMax = builder.NamesWithMinMaxOption.ValueOrFailure();
		NamesWithRegex = builder.NamesWithRegexOption.ValueOrFailure();
		NamesWithRegexMin = builder.NamesWithRegexMinOption.ValueOrFailure();
		NamesWithRegexMax = builder.NamesWithRegexMaxOption.ValueOrFailure();
		NamesWithRegexMinMax = builder.NamesWithRegexMinMaxOption.ValueOrFailure();
		IntegerId = builder.IntegerIdOption.ValueOrFailure();
		IntegerIdMin = builder.IntegerIdMinOption.ValueOrFailure();
		IntegerIdMax = builder.IntegerIdMaxOption.ValueOrFailure();
		IntegerIdMinAndMax = builder.IntegerIdMinAndMaxOption.ValueOrFailure();
		DecimalSalary = builder.DecimalSalaryOption.ValueOrFailure();
		DecimalSalaryMin = builder.DecimalSalaryMinOption.ValueOrFailure();
		DecimalSalaryMax = builder.DecimalSalaryMaxOption.ValueOrFailure();
		DecimalSalaryMinAndMax = builder.DecimalSalaryMinAndMaxOption.ValueOrFailure();
		Birthday = builder.BirthdayOption.ValueOrFailure();
		Type = builder.TypeOption.ValueOrFailure();
	}

	/// TODO: Remember to write tests for business logic
	/// TODO: and then if code coverage decreases comment or delete the code not used

	///<summary>User's builder. </summary>
	public sealed class Builder : AbstractEntityBuilder<User>
	{
		protected override Option<string> AlreadyBuiltErrorMessage => Option.None<string>();
		protected override Option<string> MustBeBuiltErrorMessage => Option.None<string>();
		internal Option<EmployeeId> EmployeeIdOption { get; private set; }

		internal Option<Names> NamesOption { get; private set; }

		internal Option<NamesWithMin> NamesWithMinOption { get; private set; }

		internal Option<NamesWithMax> NamesWithMaxOption { get; private set; }

		internal Option<NamesWithMinMax> NamesWithMinMaxOption { get; private set; }

		internal Option<NamesWithRegex> NamesWithRegexOption { get; private set; }

		internal Option<NamesWithRegexMin> NamesWithRegexMinOption { get; private set; }

		internal Option<NamesWithRegexMax> NamesWithRegexMaxOption { get; private set; }

		internal Option<NamesWithRegexMinMax> NamesWithRegexMinMaxOption { get; private set; }

		internal Option<IntegerId> IntegerIdOption { get; private set; }

		internal Option<IntegerIdMin> IntegerIdMinOption { get; private set; }

		internal Option<IntegerIdMax> IntegerIdMaxOption { get; private set; }

		internal Option<IntegerIdMinAndMax> IntegerIdMinAndMaxOption { get; private set; }

		internal Option<DecimalSalary> DecimalSalaryOption { get; private set; }

		internal Option<DecimalSalaryMin> DecimalSalaryMinOption { get; private set; }

		internal Option<DecimalSalaryMax> DecimalSalaryMaxOption { get; private set; }

		internal Option<DecimalSalaryMinAndMax> DecimalSalaryMinAndMaxOption { get; private set; }

		internal Option<Birthday> BirthdayOption { get; private set; }

		internal Option<Type> TypeOption { get; private set; }

		private new Builder SetProperty(Action setter) => (Builder)base.SetProperty(setter);

		/// <inheritdoc />
		protected override User DoBuild()
		{
			State.IsTrue(EmployeeIdOption.HasValue, "User's EmployeeId is missing");
			State.IsTrue(NamesOption.HasValue, "User's Names is missing");
			State.IsTrue(NamesWithMinOption.HasValue, "User's NamesWithMin is missing");
			State.IsTrue(NamesWithMaxOption.HasValue, "User's NamesWithMax is missing");
			State.IsTrue(NamesWithMinMaxOption.HasValue, "User's NamesWithMinMax is missing");
			State.IsTrue(NamesWithRegexOption.HasValue, "User's NamesWithRegex is missing");
			State.IsTrue(NamesWithRegexMinOption.HasValue, "User's NamesWithRegexMin is missing");
			State.IsTrue(NamesWithRegexMaxOption.HasValue, "User's NamesWithRegexMax is missing");
			State.IsTrue(NamesWithRegexMinMaxOption.HasValue, "User's NamesWithRegexMinMax is missing");
			State.IsTrue(IntegerIdOption.HasValue, "User's IntegerId is missing");
			State.IsTrue(IntegerIdMinOption.HasValue, "User's IntegerIdMin is missing");
			State.IsTrue(IntegerIdMaxOption.HasValue, "User's IntegerIdMax is missing");
			State.IsTrue(IntegerIdMinAndMaxOption.HasValue, "User's IntegerIdMinAndMax is missing");
			State.IsTrue(DecimalSalaryOption.HasValue, "User's DecimalSalary is missing");
			State.IsTrue(DecimalSalaryMinOption.HasValue, "User's DecimalSalaryMin is missing");
			State.IsTrue(DecimalSalaryMaxOption.HasValue, "User's DecimalSalaryMax is missing");
			State.IsTrue(DecimalSalaryMinAndMaxOption.HasValue, "User's DecimalSalaryMinAndMax is missing");
			State.IsTrue(BirthdayOption.HasValue, "User's Birthday is missing");
			State.IsTrue(TypeOption.HasValue, "User's Type is missing");

			return new User(this);
		}

		public Builder WithEmployeeId(EmployeeId employeeId)
		    => SetProperty(() => EmployeeIdOption = Arguments.NotNull(employeeId, nameof(employeeId)).SomeNotNull());

		public Builder WithNames(Names names)
		    => SetProperty(() => NamesOption = Arguments.NotNull(names, nameof(names)).SomeNotNull());

		public Builder WithNamesWithMin(NamesWithMin namesWithMin)
		    => SetProperty(() => NamesWithMinOption = Arguments.NotNull(namesWithMin, nameof(namesWithMin)).SomeNotNull());

		public Builder WithNamesWithMax(NamesWithMax namesWithMax)
		    => SetProperty(() => NamesWithMaxOption = Arguments.NotNull(namesWithMax, nameof(namesWithMax)).SomeNotNull());

		public Builder WithNamesWithMinMax(NamesWithMinMax namesWithMinMax)
		    => SetProperty(() => NamesWithMinMaxOption = Arguments.NotNull(namesWithMinMax, nameof(namesWithMinMax)).SomeNotNull());

		public Builder WithNamesWithRegex(NamesWithRegex namesWithRegex)
		    => SetProperty(() => NamesWithRegexOption = Arguments.NotNull(namesWithRegex, nameof(namesWithRegex)).SomeNotNull());

		public Builder WithNamesWithRegexMin(NamesWithRegexMin namesWithRegexMin)
		    => SetProperty(() => NamesWithRegexMinOption = Arguments.NotNull(namesWithRegexMin, nameof(namesWithRegexMin)).SomeNotNull());

		public Builder WithNamesWithRegexMax(NamesWithRegexMax namesWithRegexMax)
		    => SetProperty(() => NamesWithRegexMaxOption = Arguments.NotNull(namesWithRegexMax, nameof(namesWithRegexMax)).SomeNotNull());

		public Builder WithNamesWithRegexMinMax(NamesWithRegexMinMax namesWithRegexMinMax)
		    => SetProperty(() => NamesWithRegexMinMaxOption = Arguments.NotNull(namesWithRegexMinMax, nameof(namesWithRegexMinMax)).SomeNotNull());

		public Builder WithIntegerId(IntegerId integerId)
		    => SetProperty(() => IntegerIdOption = Arguments.NotNull(integerId, nameof(integerId)).SomeNotNull());

		public Builder WithIntegerIdMin(IntegerIdMin integerIdMin)
		    => SetProperty(() => IntegerIdMinOption = Arguments.NotNull(integerIdMin, nameof(integerIdMin)).SomeNotNull());

		public Builder WithIntegerIdMax(IntegerIdMax integerIdMax)
		    => SetProperty(() => IntegerIdMaxOption = Arguments.NotNull(integerIdMax, nameof(integerIdMax)).SomeNotNull());

		public Builder WithIntegerIdMinAndMax(IntegerIdMinAndMax integerIdMinAndMax)
		    => SetProperty(() => IntegerIdMinAndMaxOption = Arguments.NotNull(integerIdMinAndMax, nameof(integerIdMinAndMax)).SomeNotNull());

		public Builder WithDecimalSalary(DecimalSalary decimalSalary)
		    => SetProperty(() => DecimalSalaryOption = Arguments.NotNull(decimalSalary, nameof(decimalSalary)).SomeNotNull());

		public Builder WithDecimalSalaryMin(DecimalSalaryMin decimalSalaryMin)
		    => SetProperty(() => DecimalSalaryMinOption = Arguments.NotNull(decimalSalaryMin, nameof(decimalSalaryMin)).SomeNotNull());

		public Builder WithDecimalSalaryMax(DecimalSalaryMax decimalSalaryMax)
		    => SetProperty(() => DecimalSalaryMaxOption = Arguments.NotNull(decimalSalaryMax, nameof(decimalSalaryMax)).SomeNotNull());

		public Builder WithDecimalSalaryMinAndMax(DecimalSalaryMinAndMax decimalSalaryMinAndMax)
		    => SetProperty(() => DecimalSalaryMinAndMaxOption = Arguments.NotNull(decimalSalaryMinAndMax, nameof(decimalSalaryMinAndMax)).SomeNotNull());

		public Builder WithBirthday(Birthday birthday)
		    => SetProperty(() => BirthdayOption = Arguments.NotNull(birthday, nameof(birthday)).SomeNotNull());

		public Builder WithType(Type type)
		    => SetProperty(() => TypeOption = Arguments.ValidEnumerationMember(type, nameof(type)).SomeNotNull());

	}
}
