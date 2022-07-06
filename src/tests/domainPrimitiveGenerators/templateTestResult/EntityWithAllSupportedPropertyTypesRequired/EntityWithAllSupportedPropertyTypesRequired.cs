using Optional;
using Triplex.Validations;

namespace RI.Novus.Core.Users;

///<summary>Represents EntityWithAllSupportedPropertyTypesRequired entity. </summary>
public sealed class EntityWithAllSupportedPropertyTypesRequired 
{
	///<summary>Represents EntityWithAllSupportedPropertyTypesRequired's Id. </summary>
	public Id Id { get; }

	///<summary>Represents EntityWithAllSupportedPropertyTypesRequired's Names. </summary>
	public Names Names { get; }

	///<summary>Represents EntityWithAllSupportedPropertyTypesRequired's Salary. </summary>
	public Salary Salary { get; }

	///<summary>Represents EntityWithAllSupportedPropertyTypesRequired's Age. </summary>
	public Age Age { get; }

	///<summary>Represents EntityWithAllSupportedPropertyTypesRequired's Birthday. </summary>
	public Birthday Birthday { get; }

	private EntityWithAllSupportedPropertyTypesRequired(Builder builder)
	{
		Arguments.NotNull(builder, nameof(builder));
		Id = builder.IdOption.ValueOrFailure();
		Names = builder.NamesOption.ValueOrFailure();
		Salary = builder.SalaryOption.ValueOrFailure();
		Age = builder.AgeOption.ValueOrFailure();
		Birthday = builder.BirthdayOption.ValueOrFailure();
	}

	/// TODO: Remember to write tests for businnes logic
	/// TODO: and then if code coverage decreases comment or delete the code not used

	///<summary>EntityWithAllSupportedPropertyTypesRequired's builder. </summary>
	public sealed class Builder : AbstractEntityBuilder<EntityWithAllSupportedPropertyTypesRequired>
	{
		protected override Option<string> AlreadyBuiltErrorMessage => Option.None<string>();
		protected override Option<string> MustBeBuiltErrorMessage => Option.None<string>();
		internal Option<Id> IdOption { get; private set; }

		internal Option<Names> NamesOption { get; private set; }

		internal Option<Salary> SalaryOption { get; private set; }

		internal Option<Age> AgeOption { get; private set; }

		internal Option<Birthday> BirthdayOption { get; private set; }

		private new Builder SetProperty(Action setter) => (Builder)base.SetProperty(setter);

		protected override EntityWithAllSupportedPropertyTypesRequired DoBuild()
		{
			State.IsTrue(IdOption.HasValue, "EntityWithAllSupportedPropertyTypesRequired's Id is missing");
			State.IsTrue(NamesOption.HasValue, "EntityWithAllSupportedPropertyTypesRequired's Names is missing");
			State.IsTrue(SalaryOption.HasValue, "EntityWithAllSupportedPropertyTypesRequired's Salary is missing");
			State.IsTrue(AgeOption.HasValue, "EntityWithAllSupportedPropertyTypesRequired's Age is missing");
			State.IsTrue(BirthdayOption.HasValue, "EntityWithAllSupportedPropertyTypesRequired's Birthday is missing");

			return new EntityWithAllSupportedPropertyTypesRequired(this);
		}

		public Builder WithId(Id id)
		    => SetProperty(() => IdOption = Arguments.NotNull(id, nameof(id).SomeNotNull()));

		public Builder WithNames(Names names)
		    => SetProperty(() => NamesOption = Arguments.NotNull(names, nameof(names).SomeNotNull()));

		public Builder WithSalary(Salary salary)
		    => SetProperty(() => SalaryOption = Arguments.NotNull(salary, nameof(salary).SomeNotNull()));

		public Builder WithAge(Age age)
		    => SetProperty(() => AgeOption = Arguments.NotNull(age, nameof(age).SomeNotNull()));

		public Builder WithBirthday(Birthday birthday)
		    => SetProperty(() => BirthdayOption = Arguments.NotNull(birthday, nameof(birthday).SomeNotNull()));

	}
}
